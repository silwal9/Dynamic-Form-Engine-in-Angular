import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DynamicFormState } from './dynamic-form.state';

export const selectDynamicFormState = createFeatureSelector<DynamicFormState>('dynamicForm');

export const selectCurrentSchema = createSelector(
  selectDynamicFormState,
  (state) => state.currentSchema
);

export const selectFormValues = createSelector(
  selectDynamicFormState,
  (state) => state.formValues
);

export const selectVisibleFields = createSelector(
  selectDynamicFormState,
  (state) => state.visibleFields
);

export const selectFormMetadata = createSelector(
  selectDynamicFormState,
  (state) => state.metadata
);

export const selectLoading = createSelector(
  selectDynamicFormState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectDynamicFormState,
  (state) => state.error
);

export const selectFormValuesJson = createSelector(
  selectFormValues,
  (values) => JSON.stringify(values, null, 2)
);
