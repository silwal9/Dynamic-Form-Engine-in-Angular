import { createAction, props } from '@ngrx/store';
import { DynamicFormSchema } from '../models/dynamic-form-schema.model';

export const loadSchema = createAction(
  '[Dynamic Form] Load Schema',
  props<{ schemaPath: string }>()
);

export const loadSchemaSuccess = createAction(
  '[Dynamic Form] Load Schema Success',
  props<{ schema: DynamicFormSchema }>()
);

export const loadSchemaFailure = createAction(
  '[Dynamic Form] Load Schema Failure',
  props<{ error: string }>()
);

export const updateFormValue = createAction(
  '[Dynamic Form] Update Form Value',
  props<{ fieldId: string; value: unknown }>()
);

export const resetForm = createAction(
  '[Dynamic Form] Reset Form'
);

export const computeVisibleFields = createAction(
  '[Dynamic Form] Compute Visible Fields'
);
