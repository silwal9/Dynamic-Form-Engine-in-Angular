import { FormField } from '../../../shared/models/form-field.model';

export interface FieldRow {
  fields: FormField[];
}

export class DynamicFormLayoutUtil {
  static organizeFieldsIntoRows(
    fields: FormField[],
    columnsPerRow: number = 2
  ): FieldRow[] {
    const rows: FieldRow[] = [];
    let currentRow: FormField[] = [];

    fields.forEach((field, index) => {
      currentRow.push(field);

      if (currentRow.length === columnsPerRow || index === fields.length - 1) {
        rows.push({ fields: [...currentRow] });
        currentRow = [];
      }
    });

    return rows;
  }

  static calculateGridColumns(totalColumns: number): string {
    return `repeat(${totalColumns}, 1fr)`;
  }
}
