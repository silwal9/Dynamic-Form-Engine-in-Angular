import { DynamicFormSchema, FormMetadata } from '../models/dynamic-form-schema.model';
import { FormField } from '../../../shared/models/form-field.model';

export interface DynamicFormState {
  currentSchema: DynamicFormSchema | null;
  formValues: Record<string, unknown>;
  visibleFields: FormField[];
  metadata: FormMetadata | null;
  loading: boolean;
  error: string | null;
}

export const initialDynamicFormState: DynamicFormState = {
  currentSchema: null,
  formValues: {},
  visibleFields: [],
  metadata: null,
  loading: false,
  error: null,
};
