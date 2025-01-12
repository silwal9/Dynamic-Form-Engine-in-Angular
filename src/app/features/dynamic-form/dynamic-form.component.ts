import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DynamicFieldComponent } from '../../shared/components/dynamic-field/dynamic-field.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { ValidationUtil } from '../../shared/utils/validation.util';
import * as DynamicFormActions from './store/dynamic-form.actions';
import * as DynamicFormSelectors from './store/dynamic-form.selectors';

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
export class DynamicFormComponent implements OnInit {
  private store = inject(Store);

  schema$ = this.store.select(DynamicFormSelectors.selectCurrentSchema);
  visibleFields$ = this.store.select(DynamicFormSelectors.selectVisibleFields);
  formValues$ = this.store.select(DynamicFormSelectors.selectFormValues);
  formValuesJson$ = this.store.select(DynamicFormSelectors.selectFormValuesJson);
  metadata$ = this.store.select(DynamicFormSelectors.selectFormMetadata);
  loading$ = this.store.select(DynamicFormSelectors.selectLoading);

  formGroup = new FormGroup({});
  showJsonPreview = signal(false);

  ngOnInit(): void {
    // Load initial schema
    this.store.dispatch(
      DynamicFormActions.loadSchema({ schemaPath: 'assets/schemas/example-basic.json' })
    );

    // Subscribe to visible fields and build form controls
    this.visibleFields$.subscribe(fields => {
      this.buildFormControls(fields);
    });
  }

  private buildFormControls(fields: any[]): void {
    const group: any = {};

    fields.forEach(field => {
      const validators = ValidationUtil.buildValidators(field.validation);
      const defaultValue = field.defaultValue ?? '';
      group[field.id] = new FormControl(defaultValue, validators);
    });

    this.formGroup = new FormGroup(group);
  }

  onFieldValueChange(event: { fieldId: string; value: unknown }): void {
    this.store.dispatch(
      DynamicFormActions.updateFormValue({ fieldId: event.fieldId, value: event.value })
    );
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
    this.store.dispatch(DynamicFormActions.resetForm());
    this.formGroup.reset();
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
