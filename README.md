# Dynamic Schema-Driven Form Engine

An enterprise-grade Angular application that generates fully functional, validated forms from JSON schemas.

## Features

- **Schema-driven UI** - Forms entirely defined by JSON configuration
- **Conditional visibility** - Fields show/hide based on form values
- **Comprehensive validation** - Required, min/max, pattern, length constraints
- **Live JSON preview** - Real-time output as users interact
- **Multiple field types** - Text, number, textarea, select, checkbox, date
- **Material Design** - Modern UI with Angular Material components

## Major Architectural Decisions

- **Standalone components** - Modern Angular architecture, better tree-shaking
- **NgRx feature store** - Isolated state management with actions, reducer, effects, selectors
- **Angular Signals** - Reactive primitives for local UI state (input/output/signal)
- **OnPush change detection** - Performance optimization via explicit change detection
- **Smart/Dumb pattern** - Container components manage state, presentational components render UI
- **Strict TypeScript** - Compile-time safety with strictest compiler options
- **BEM CSS** - Block-Element-Modifier methodology for style encapsulation
- **Enterprise folder structure** - core/shared/features separation of concerns

## Project Structure

```
src/app/
├── core/                    # Singleton services
├── shared/                  # Reusable components, models, utils
│   ├── components/dynamic-field/
│   └── ui/modal/
└── features/dynamic-form/   # Feature module with NgRx store
    ├── store/               # Actions, reducer, effects, selectors
    ├── models/
    └── utils/
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
- `min` / `max` - Numeric bounds
- `minLength` / `maxLength` - String length constraints
- `pattern` - Regex validation

---

**Built with Angular 18, NgRx 18, Angular Material, and TypeScript**
