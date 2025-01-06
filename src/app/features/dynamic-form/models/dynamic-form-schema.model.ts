import { FormField } from '../../../shared/models/form-field.model';

export interface DynamicFormSchema {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  layout?: {
    columns: number;
  };
}

export interface FormMetadata {
  totalFields: number;
  requiredFields: number;
  optionalFields: number;
}
