import { FormField, FieldType } from '../../models/form-field.model';

export class DynamicFieldUtils {
  static getInputType(fieldType: FieldType): string {
    switch (fieldType) {
      case 'text':
        return 'text';
      case 'number':
        return 'number';
      case 'date':
        return 'date';
      default:
        return 'text';
    }
  }

  static shouldShowField(field: FormField, formValues: Record<string, unknown>): boolean {
    if (!field.showIf) {
      return true;
    }

    const dependentValue = formValues[field.showIf.field];
    return dependentValue === field.showIf.equals;
  }

  static getDefaultValue(field: FormField): unknown {
    if (field.defaultValue !== undefined) {
      return field.defaultValue;
    }

    switch (field.type) {
      case 'checkbox':
        return false;
      case 'number':
        return null;
      default:
        return '';
    }
  }
}
