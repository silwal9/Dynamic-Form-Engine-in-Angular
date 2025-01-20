# Dynamic Schema-Driven Form Engine

An enterprise-grade Angular application demonstrating advanced frontend architecture patterns with dynamic form generation, NgRx state management, and Angular Signals.

## Overview

This project showcases a production-ready dynamic form engine that generates fully functional, validated forms from JSON schemas. Built with modern Angular best practices, it demonstrates senior-level frontend engineering capabilities including:

- **Schema-driven UI generation** - Forms are entirely defined by JSON configuration
- **Real-time conditional visibility** - Fields show/hide based on form values
- **Comprehensive validation** - Required, min/max, pattern, length constraints
- **Live preview** - JSON output updates as users interact with the form
- **Multiple field types** - Text, number, textarea, select, checkbox, date

## Architecture Highlights

### Enterprise Folder Structure

```
src/app/
├── core/                    # Singleton services
│   └── services/
│       └── form-schema.service.ts
├── shared/                  # Reusable components and utilities
│   ├── models/
│   ├── utils/
│   ├── components/
│   │   └── dynamic-field/   # Dumb component with BEM CSS
│   └── ui/
│       └── modal/
└── features/                # Feature modules
    └── dynamic-form/        # Smart container component
        ├── store/           # Feature-scoped NgRx store
        ├── models/
        └── utils/
```

### NgRx Feature Store

Fully isolated state management with clear separation of concerns:

- **State** - Typed interface defining form state shape
- **Actions** - Schema loading, form updates, field visibility computation
- **Reducer** - Pure functions for state transitions with conditional field logic
- **Effects** - Async schema loading from assets
- **Selectors** - Memoized, type-safe state queries

```typescript
// Example selector usage
visibleFields$ = this.store.select(selectVisibleFields);
formValuesJson$ = this.store.select(selectFormValuesJson);
```

### Angular Signals Architecture

Modern reactive primitives for optimal change detection:

```typescript
showJsonPreview = signal(false);  // Local UI state
field = input.required<FormField>();  // Component inputs
valueChange = output<{...}>();  // Component outputs
```

### Smart/Dumb Component Pattern

- **Smart Container** (`dynamic-form.component`) - Manages NgRx subscriptions, orchestrates data flow
- **Dumb Presentational** (`dynamic-field.component`) - Receives data via inputs, emits events via outputs

### Type Safety & Strict Mode

Leverages TypeScript's strictest compiler options:

```json
{
  "strict": true,
  "noImplicitOverride": true,
  "noPropertyAccessFromIndexSignature": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true
}
```

### BEM CSS Methodology

All styles follow Block-Element-Modifier naming:

```scss
.dynamic-field {
  &__form-field { }
  &__label { }
  &__input { }
  &__error { }
}
```

## Key Technical Decisions

### Why Standalone Components?

Modern Angular promotes standalone components for better tree-shaking, simpler imports, and reduced boilerplate.

### Why Feature-Level Store?

Scoping NgRx to features prevents global state pollution and improves maintainability. Each feature owns its state.

### Why Signals Over RxJS Everywhere?

Signals provide simpler, more performant reactivity for local UI state. RxJS remains ideal for async operations (HTTP, effects).

### Why OnPush Change Detection?

Explicit change detection via signals and observables improves performance and prevents unnecessary re-renders.

## Schema Documentation

### Basic Schema Example

```json
{
  "id": "basic-form",
  "title": "Contact Form",
  "description": "A simple contact form",
  "fields": [
    {
      "id": "email",
      "type": "text",
      "label": "Email Address",
      "validation": {
        "required": true,
        "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
      }
    }
  ],
  "layout": { "columns": 2 }
}
```

### Advanced Features

#### Conditional Visibility

```json
{
  "id": "otherCountry",
  "type": "text",
  "label": "Specify Country",
  "showIf": {
    "field": "country",
    "equals": "other"
  }
}
```

#### Validation Rules

- `required` - Field must have a value
- `min` / `max` - Numeric bounds
- `minLength` / `maxLength` - String length constraints
- `pattern` - Regex validation

#### Supported Field Types

- `text` - Single-line text input
- `number` - Numeric input with min/max
- `textarea` - Multi-line text
- `select` - Dropdown with options
- `checkbox` - Boolean toggle
- `date` - Date picker (Material Design)

## Running the Project

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200`

### Build

```bash
npm run build
```

Production build output in `dist/`

### Testing

```bash
npm test
```

## Extension Ideas

### Immediate Enhancements

1. **Multi-step forms** - Wizard UI with step navigation
2. **Field dependencies** - Disable fields based on other values
3. **Custom validators** - Async validation (unique username, etc.)
4. **Persistence** - Save/load form state to localStorage
5. **Schema versioning** - Migrate schemas across versions

### Advanced Features

1. **Repeater fields** - Dynamic add/remove field groups
2. **File uploads** - With preview and drag-drop
3. **Rich text editor** - WYSIWYG for textarea fields
4. **Field templates** - Reusable field groups
5. **Analytics integration** - Track field interactions
6. **A/B testing** - Schema experiments
7. **Accessibility audit** - WCAG 2.1 AA compliance

### Architecture Improvements

1. **Lazy-loaded schemas** - Route-based schema loading
2. **Schema validation** - JSON schema validation on load
3. **Undo/Redo** - Time-travel debugging with NgRx
4. **Offline support** - Service worker with form caching
5. **i18n** - Multi-language support

## Why This Demonstrates Senior-Level Skills

### Architecture Mastery

- Enterprise folder structure with clear separation of concerns
- Feature-scoped state management avoiding global state anti-patterns
- Smart/dumb component pattern for testability and reusability

### Modern Angular Expertise

- Standalone components with explicit dependencies
- Signals for optimal reactivity and change detection
- OnPush strategy for performance optimization
- Strict TypeScript for compile-time safety

### State Management Proficiency

- NgRx best practices: actions, reducer, effects, selectors
- Derived state computation (visible fields based on form values)
- Memoized selectors for performance
- Side effect isolation in effects

### Scalability & Maintainability

- Schema-driven approach allows non-developers to create forms
- Type-safe models prevent runtime errors
- BEM CSS prevents style conflicts
- Utility classes for reusable logic

### Production-Ready Code

- Comprehensive validation with user-friendly error messages
- Loading states and error handling
- Responsive design with Material Design components
- Clean, self-documenting code with clear naming conventions

## License

MIT

---

**Built with Angular 18, NgRx 18, Angular Material, and TypeScript**
