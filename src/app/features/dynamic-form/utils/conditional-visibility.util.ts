import { FormField } from '../../../shared/models/form-field.model';

export class ConditionalVisibilityUtil {
  static evaluateVisibility(
    field: FormField,
    formValues: Record<string, unknown>
  ): boolean {
    if (!field.showIf) {
      return true;
    }

    const dependentFieldValue = formValues[field.showIf.field];
    return dependentFieldValue === field.showIf.equals;
  }

  static filterVisibleFields(
    fields: FormField[],
    formValues: Record<string, unknown>
  ): FormField[] {
    return fields.filter(field => this.evaluateVisibility(field, formValues));
  }
}
