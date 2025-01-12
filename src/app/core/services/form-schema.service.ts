import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DynamicFormSchema } from '../../features/dynamic-form/models/dynamic-form-schema.model';

@Injectable({
  providedIn: 'root',
})
export class FormSchemaService {
  constructor(private http: HttpClient) {}

  loadSchema(schemaPath: string): Observable<DynamicFormSchema> {
    return this.http.get<DynamicFormSchema>(schemaPath);
  }
}
