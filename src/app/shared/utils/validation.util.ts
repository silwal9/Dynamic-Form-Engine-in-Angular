import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidationRule } from '../models/form-field.model';

export class ValidationUtil {
  static buildValidators(rules?: ValidationRule): ValidatorFn[] {
    if (!rules) {
      return [];
    }

    const validators: ValidatorFn[] = [];

    if (rules.required) {
      validators.push(Validators.required);
    }

    if (rules.min !== undefined) {
      validators.push(Validators.min(rules.min));
    }

    if (rules.max !== undefined) {
      validators.push(Validators.max(rules.max));
    }

    if (rules.minLength !== undefined) {
      validators.push(Validators.minLength(rules.minLength));
    }

    if (rules.maxLength !== undefined) {
      validators.push(Validators.maxLength(rules.maxLength));
    }

    if (rules.pattern) {
      validators.push(Validators.pattern(rules.pattern));
    }

    return validators;
  }

  static getErrorMessage(control: AbstractControl, fieldLabel: string): string {
    const errors = control.errors;
    if (!errors) {
      return '';
    }

    if (errors['required']) {
      return `${fieldLabel} is required`;
    }

    if (errors['min']) {
      return `${fieldLabel} must be at least ${errors['min'].min}`;
    }

    if (errors['max']) {
      return `${fieldLabel} must be at most ${errors['max'].max}`;
    }

    if (errors['minlength']) {
      return `${fieldLabel} must be at least ${errors['minlength'].requiredLength} characters`;
    }

    if (errors['maxlength']) {
      return `${fieldLabel} must be at most ${errors['maxlength'].requiredLength} characters`;
    }

    if (errors['pattern']) {
      return `${fieldLabel} format is invalid`;
    }

    return 'Invalid value';
  }
}
