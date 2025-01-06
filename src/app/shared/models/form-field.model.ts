export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'date';

export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}

export interface ConditionalRule {
  field: string;
  equals: string | number | boolean;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  validation?: ValidationRule;
  showIf?: ConditionalRule;
  options?: SelectOption[];
  row?: number;
  column?: number;
}
