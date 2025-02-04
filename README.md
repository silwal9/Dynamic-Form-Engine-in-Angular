# Dynamic Schema-Driven Form Engine

An enterprise-grade Angular application that generates fully functional, validated forms from JSON schemas.

## Features

- **Schema-driven UI** - Forms entirely defined by JSON configuration
- **Conditional visibility** - Fields show/hide based on form values with automatic validator management
- **Comprehensive validation** - Required, min/max, pattern, length constraints with real-time error display
- **Smart validation** - Hidden conditional fields don't block form submission
- **Snackbar notifications** - Color-coded success (green) and error (red) messages with auto-dismiss
- **Live JSON preview** - Real-time output as users interact
- **Multiple field types** - Text, number, textarea, select, checkbox, date
- **Material Design** - Modern UI with Angular Material components
- **Type-safe** - Zero `any` types, fully typed TypeScript implementation

## Major Architectural Decisions

- **Standalone components** - Modern Angular architecture, better tree-shaking
- **NgRx feature store** - Isolated state management with actions, reducer, effects, selectors
- **Angular Signals** - Reactive primitives for local UI state (signal/computed/effect)
- **Computed signals** - Automatic dependency tracking for field visibility and metadata
- **Effects for side effects** - Dynamic validator updates based on field visibility
- **OnPush change detection** - Performance optimization via explicit change detection
- **Reactive forms** - FormGroup with valueChanges for automatic state synchronization
- **Smart/Dumb pattern** - Container components manage state, presentational components render UI
- **Strict TypeScript** - Compile-time safety with no `any` types
- **BEM CSS** - Block-Element-Modifier methodology for style encapsulation
- **Enterprise folder structure** - core/shared/features separation of concerns

## Project Structure

```
src/
├── app/
│   ├── core/                    # Singleton services
│   ├── shared/                  # Reusable components, models, utils
│   │   ├── components/
│   │   │   └── dynamic-field/   # Generic field renderer
│   │   ├── ui/
│   │   │   └── modal/           # Snackbar notification component
│   │   ├── models/              # TypeScript interfaces (FormField, ValidationRule)
│   │   └── utils/               # ValidationUtil for form validation
│   └── features/
│       └── dynamic-form/        # Feature module with NgRx store
│           ├── store/           # Actions, reducer, effects, selectors
│           ├── dynamic-form.component.ts
│           ├── dynamic-form.component.html
│           └── dynamic-form.component.scss
└── assets/
    └── schemas/                 # JSON schema definitions
        ├── example-basic.json
        └── example-advanced.json
```

## Schema Example

```json
{
  "id": "contact-form",
  "title": "Contact Form",
  "fields": [
    {
      "id": "email",
      "type": "text",
      "label": "Email",
      "validation": { "required": true, "pattern": "..." }
    },
    {
      "id": "country",
      "type": "select",
      "label": "Country",
      "options": [...]
    },
    {
      "id": "details",
      "type": "textarea",
      "label": "Additional Details",
      "showIf": { "field": "country", "equals": "other" }
    }
  ]
}
```

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm start

# Navigate to http://localhost:4200
```

## Build

```bash
npm run build
```

## Supported Field Types

- `text` - Single-line text input
- `number` - Numeric input with min/max validation
- `textarea` - Multi-line text
- `select` - Dropdown with options
- `checkbox` - Boolean toggle
- `date` - Material Design date picker

## Validation Rules

- `required` - Field must have a value
- `min` / `max` - Numeric bounds (for number fields)
- `minLength` / `maxLength` - String length constraints (for text/textarea)
- `pattern` - Regex validation (e.g., email, phone number formats)

## Key Implementation Details

### Conditional Field Validation
Hidden fields automatically have their validators cleared and don't block form submission. This is managed through an Angular effect that watches field visibility changes.

### Form State Management
- Schema loaded via NgRx effects from JSON files
- Form values tracked with Angular signals for reactive updates
- FormGroup valueChanges automatically syncs with signal state
- Computed signals derive visible fields and metadata

### Validation Error Display
All field types (including checkboxes) show validation errors when touched and invalid. Error messages are user-friendly and field-specific.

### Snackbar Notifications
Custom snackbar component with:
- Green background for success messages
- Red background for error messages
- Auto-dismiss after 5 seconds
- Manual close button
- Slide-in animation from top-right

---

**Built with Angular 18, NgRx 18, Angular Material, and TypeScript**
