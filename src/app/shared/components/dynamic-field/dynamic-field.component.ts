import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormField } from '../../models/form-field.model';
import { DynamicFieldUtils } from './dynamic-field.utils';
import { ValidationUtil } from '../../utils/validation.util';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFieldComponent {
  field = input.required<FormField>();
  control = input.required<FormControl>();

  valueChange = output<{ fieldId: string; value: unknown }>();

  protected readonly DynamicFieldUtils = DynamicFieldUtils;

  onValueChange(value: unknown): void {
    this.valueChange.emit({ fieldId: this.field().id, value });
  }

  getErrorMessage(): string {
    return ValidationUtil.getErrorMessage(this.control(), this.field().label);
  }
}
