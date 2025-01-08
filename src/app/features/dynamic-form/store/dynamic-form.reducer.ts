import { createReducer, on } from '@ngrx/store';
import { DynamicFormState, initialDynamicFormState } from './dynamic-form.state';
import * as DynamicFormActions from './dynamic-form.actions';
import { FormField } from '../../../shared/models/form-field.model';

function calculateVisibleFields(
  fields: FormField[],
  formValues: Record<string, unknown>
): FormField[] {
  return fields.filter(field => {
    if (!field.showIf) {
      return true;
    }

    const dependentValue = formValues[field.showIf.field];
    return dependentValue === field.showIf.equals;
  });
}

function calculateMetadata(fields: FormField[]) {
  const requiredFields = fields.filter(f => f.validation?.required).length;
  return {
    totalFields: fields.length,
    requiredFields,
    optionalFields: fields.length - requiredFields,
  };
}

export const dynamicFormReducer = createReducer(
  initialDynamicFormState,

  on(DynamicFormActions.loadSchema, (state): DynamicFormState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(DynamicFormActions.loadSchemaSuccess, (state, { schema }): DynamicFormState => {
    const visibleFields = calculateVisibleFields(schema.fields, state.formValues);
    const metadata = calculateMetadata(visibleFields);

    return {
      ...state,
      currentSchema: schema,
      visibleFields,
      metadata,
      loading: false,
      error: null,
    };
  }),

  on(DynamicFormActions.loadSchemaFailure, (state, { error }): DynamicFormState => ({
    ...state,
    loading: false,
    error,
  })),

  on(DynamicFormActions.updateFormValue, (state, { fieldId, value }): DynamicFormState => {
    const formValues = {
      ...state.formValues,
      [fieldId]: value,
    };

    const visibleFields = state.currentSchema
      ? calculateVisibleFields(state.currentSchema.fields, formValues)
      : [];

    const metadata = calculateMetadata(visibleFields);

    return {
      ...state,
      formValues,
      visibleFields,
      metadata,
    };
  }),

  on(DynamicFormActions.resetForm, (state): DynamicFormState => {
    const visibleFields = state.currentSchema
      ? calculateVisibleFields(state.currentSchema.fields, {})
      : [];

    const metadata = calculateMetadata(visibleFields);

    return {
      ...state,
      formValues: {},
      visibleFields,
      metadata,
    };
  })
);
