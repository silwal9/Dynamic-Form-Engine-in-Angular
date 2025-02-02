import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DynamicFieldComponent } from '../../shared/components/dynamic-field/dynamic-field.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { ValidationUtil } from '../../shared/utils/validation.util';
import { FormField } from '../../shared/models/form-field.model';
import * as DynamicFormActions from './store/dynamic-form.actions';
import * as DynamicFormSelectors from './store/dynamic-form.selectors';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    DynamicFieldComponent,
    ModalComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  schema$ = this.store.select(DynamicFormSelectors.selectCurrentSchema);
  loading$ = this.store.select(DynamicFormSelectors.selectLoading);

  private allFields = signal<FormField[]>([]);
  private formValues = signal<Record<string, any>>({});

  visibleFields = computed(() => {
    const fields = this.allFields();
    const values = this.formValues();
    return fields.filter(field => {
      if (!field.showIf) return true;
      return values[field.showIf.field] === field.showIf.equals;
    });
  });

  metadata = computed(() => {
    const fields = this.visibleFields();
    const requiredFields = fields.filter(f => f.validation?.required).length;
    return {
      totalFields: fields.length,
      requiredFields,
      optionalFields: fields.length - requiredFields,
    };
  });

  formGroup = new FormGroup({});
  showJsonPreview = signal(false);
  formValuesJson = computed(() => JSON.stringify(this.formValues(), null, 2));

  ngOnInit(): void {
    // Load initial schema
    this.store.dispatch(
      DynamicFormActions.loadSchema({ schemaPath: 'assets/schemas/example-basic.json' })
    );

    // Subscribe to schema and build form controls when schema changes
    this.schema$
      .pipe(takeUntil(this.destroy$))
      .subscribe(schema => {
        if (schema) {
          this.allFields.set(schema.fields);
          this.buildFormControls(schema.fields);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildFormControls(fields: FormField[]): void {
    const group: any = {};

    fields.forEach(field => {
      const validators = ValidationUtil.buildValidators(field.validation);
      const defaultValue = field.defaultValue ?? '';
      group[field.id] = new FormControl(defaultValue, validators);
    });

    this.formGroup = new FormGroup(group);

    // Listen to form changes to update visibility
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(values => {
        this.formValues.set(values || {});
      });

    // Set initial values
    this.formValues.set(this.formGroup.value);
  }

  onFieldValueChange(event: { fieldId: string; value: unknown }): void {
    // This is no longer needed as we listen to formGroup.valueChanges
    // But keeping it for backward compatibility with the template
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Form submitted:', this.formGroup.value);
      alert('Form submitted successfully! Check console for values.');
    } else {
      this.formGroup.markAllAsTouched();
      alert('Please fix validation errors before submitting.');
    }
  }

  onReset(): void {
    this.formGroup.reset();
    this.formValues.set(this.formGroup.value);
  }

  toggleJsonPreview(): void {
    this.showJsonPreview.update(value => !value);
  }

  loadSchema(schemaName: string): void {
    this.store.dispatch(
      DynamicFormActions.loadSchema({ schemaPath: `assets/schemas/${schemaName}.json` })
    );
  }
}
