import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { dynamicFormReducer } from './app/features/dynamic-form/store/dynamic-form.reducer';
import { DynamicFormEffects } from './app/features/dynamic-form/store/dynamic-form.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideStore({
      dynamicForm: dynamicFormReducer,
    }),
    provideEffects(DynamicFormEffects),
  ],
}).catch((err) => console.error(err));
