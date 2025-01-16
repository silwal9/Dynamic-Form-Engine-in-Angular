import { Component } from '@angular/core';
import { DynamicFormComponent } from './features/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <div class="app">
      <app-dynamic-form></app-dynamic-form>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      background-color: #f5f5f5;
    }
  `],
})
export class AppComponent {
  title = 'dynamic-form-engine';
}
