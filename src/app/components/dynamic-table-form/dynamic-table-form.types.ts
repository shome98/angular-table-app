export type ColumnType =
  | 'text'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'textarea'
  | 'email';

export interface SelectOption {
  label: string;
  value: any;
  badgeClass?: string;
}

export interface TableColumnConfig {
  key: string;
  label: string;
  type: ColumnType;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  patternMessage?: string;
  options?: SelectOption[];
  defaultValue?: any;
  width?: string;
  disabled?: boolean;
  readOnly?: boolean;
  badge?: string;
  tooltip?: string;
}

export interface TableFormBadge {
  text: string;
  colorClass?: string;
}

export interface TableFormConfig {
  id: string;
  title: string;
  description?: string;
  badge?: TableFormBadge;
  icon?: string;
  columns: TableColumnConfig[];
  addBtnText?: string;
  allowDelete?: boolean;
  allowDuplicate?: boolean;
  allowClear?: boolean;
  minRows?: number;
  maxRows?: number;
  showRowNumbers?: boolean;
  emptyMessage?: string;
  themeColor?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'secondary';
}
