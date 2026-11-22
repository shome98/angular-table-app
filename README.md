# Reusable Configuration-Driven Angular Table Form Application

A modular, highly reusable, configuration-driven Angular application featuring dynamic table forms powered by Reactive Forms, Bootstrap 5 CDN, and FontAwesome 6 CDN icons.

The application displays **5 distinct configuration-driven table forms** on a single unified page with live validation, dynamic row addition/duplication/deletion, and real-time JSON export.

---

## 🌟 Key Features

1. **100% Configuration-Driven**:
   - Every table form's schema, headers, field types, validations, styles, tooltips, and default values are defined using a structured TypeScript configuration object (`TableFormConfig`).
2. **Dynamic Row Management**:
   - **Add Row**: Configurable button text and default values.
   - **Duplicate Row**: Clones any existing row with 1 click.
   - **Delete Row**: Removes row with reactive form re-indexing.
   - **Clear All & Reset**: Wipe records or restore initial dummy data.
3. **Robust Reactive Form Validations**:
   - Field validations for `required`, `email`, `min`, `max`, `minLength`, `maxLength`, and regex `pattern`.
   - Real-time feedback with red invalid borders and error messages.
   - Form-level validity indicators (Form Valid vs Errors Detected).
4. **Bootstrap 5 CDN & FontAwesome 6 Free Icons**:
   - Zero local heavyweight CSS setup—uses standard CDN links for instant styling, cards, tables, and icons.
5. **5 Configured Tables with Dummy Constant Data**:
   - Pre-populated using `TABLE_DUMMY_DATA` from `src/app/constants/table-dummy-data.ts`.
6. **Live Data & JSON Export**:
   - Interactive modal to inspect and copy live aggregated JSON form data.
   - Direct `.json` file download option.

---

## 🗺️ Application Routes

The app provides two interactive modes accessible via the top navigation bar:

### 1. Route `/` — Independent Tables Mode
- Hosts **5 independent configuration-driven table forms** (HR Employees, Product Inventory, Sprint Tasks, Vendor Contracts, Expense Claims).
- Demonstrates how the reusable component handles 5 distinct schemas with unique input types, validations, and initial dummy datasets simultaneously.

### 2. Route `/connected` — Connected Master-Detail Mode
- Hosts **5 synchronized table forms** reusing `<app-dynamic-table-form>`:
  - **Table 1: Master Budget Allocations (`master`)**:
    - Fields: `title`, `type` (synced), `amount` (synced), `fiscalQuarter`, `owner`, `isApproved`.
    - Adding a row or editing `type` or `amount` in Table 1 **automatically updates the next 4 tables in real time**!
    - Deleting a row from Table 1 removes the matching synchronized row in the 4 connected tables.
  - **Table 2: Department Work Breakdown (`department`)**:
    - Connected fields: `type` (read-only, linked), `amount` (read-only, linked).
    - Own columns: `department`, `leadPerson`, `utilizationPercent`, `headcount`.
  - **Table 3: Vendor & Procurement Contracts (`vendor`)**:
    - Connected fields: `type` (read-only, linked), `amount` (read-only, linked).
    - Own columns: `vendorName`, `contractRef`, `paymentTerms`, `taxIncluded`.
  - **Table 4: Execution Schedule & Milestones (`schedule`)**:
    - Connected fields: `type` (read-only, linked), `amount` (read-only, linked).
    - Own columns: `milestoneGoal`, `deliveryQuarter`, `targetDate`, `contingencyPercent`.
  - **Table 5: Audit, Risk & Compliance Controls (`audit`)**:
    - Connected fields: `type` (read-only, linked), `amount` (read-only, linked).
    - Own columns: `riskRating`, `complianceStandard`, `auditorName`, `auditSignOff`.
  - **Key Architecture Benefit**: Editing custom columns in child tables (e.g. typing a vendor name or milestone goal) is completely preserved while `type` and `amount` remain live-bound to Table 1!

---

## ⚙️ Configuration Schema

Form schemas are strongly typed in `src/app/components/dynamic-table-form/dynamic-table-form.types.ts`:

```typescript
export type ColumnType = 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'textarea' | 'email';

export interface TableColumnConfig {
  key: string;               // Control name in FormGroup
  label: string;             // Table header label
  type: ColumnType;          // Supported input type
  placeholder?: string;
  required?: boolean;
  min?: number;              // For numeric inputs
  max?: number;
  step?: number;
  minLength?: number;        // For text inputs
  maxLength?: number;
  pattern?: string;          // Regex validation pattern
  patternMessage?: string;   // Custom error message for regex
  options?: SelectOption[];  // For 'select' dropdowns
  defaultValue?: any;
  width?: string;            // Column CSS width (e.g. '180px')
  disabled?: boolean;
  tooltip?: string;
}

export interface TableFormConfig {
  id: string;
  title: string;
  description?: string;
  icon?: string;             // FontAwesome icon class (e.g. 'fa-solid fa-users')
  themeColor?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';
  badge?: { text: string; colorClass?: string };
  columns: TableColumnConfig[];
  addBtnText?: string;
  allowDelete?: boolean;
  allowDuplicate?: boolean;
  allowClear?: boolean;
  minRows?: number;
  maxRows?: number;
  showRowNumbers?: boolean;
  emptyMessage?: string;
}
```

---

## 🚀 How to Run

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Start Development Server
```bash
npm start
# or
ng serve
```

Navigate your browser to:
```
http://localhost:4200/
```

### Typecheck & Specs
```bash
npx tsc --noEmit
```

---

## 📂 Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── dynamic-table-form/
│   │       ├── dynamic-table-form.component.ts    # Reusable table form component
│   │       ├── dynamic-table-form.component.html  # Dynamic table template
│   │       ├── dynamic-table-form.component.css   # Component styling
│   │       ├── dynamic-table-form.component.spec.ts # Unit tests
│   │       └── dynamic-table-form.types.ts        # TypeScript schemas & configs
│   ├── constants/
│   │   └── table-dummy-data.ts                    # 5 table configs & dummy data
│   ├── app.ts                                     # Root host component
│   ├── app.html                                   # Layout hosting 5 dynamic tables
│   ├── app.css                                    # Host component styles
│   └── app.spec.ts                                # App unit tests
├── index.html                                     # Bootstrap 5 & FontAwesome 6 CDNs
└── styles.css                                     # Clean application typography & reset
```
