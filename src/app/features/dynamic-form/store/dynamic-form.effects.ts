import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as DynamicFormActions from './dynamic-form.actions';
import { FormSchemaService } from '../../../core/services/form-schema.service';

@Injectable()
export class DynamicFormEffects {
  private actions$ = inject(Actions);
  private schemaService = inject(FormSchemaService);

  loadSchema$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormActions.loadSchema),
      switchMap(({ schemaPath }) =>
        this.schemaService.loadSchema(schemaPath).pipe(
          map(schema => DynamicFormActions.loadSchemaSuccess({ schema })),
          catchError(error =>
            of(DynamicFormActions.loadSchemaFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
