import { FormField } from '../../models/form-field.model';

export interface DynamicFieldConfig extends FormField {
  value: unknown;
  errorMessage?: string;
}
