import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { TableFormConfig, TableColumnConfig } from './dynamic-table-form.types';

@Component({
  selector: 'app-dynamic-table-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dynamic-table-form.component.html',
  styleUrl: './dynamic-table-form.component.css'
})
export class DynamicTableFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input({ required: true }) config!: TableFormConfig;
  @Input() initialData: any[] = [];

  @Output() dataChange = new EventEmitter<any[]>();
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() rowAdded = new EventEmitter<any>();
  @Output() rowRemoved = new EventEmitter<{ index: number; data: any }>();

  form!: FormGroup;
  private valueChangesSub?: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && !changes['initialData'].firstChange) {
      this.populateData(this.initialData);
    }
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  get rowsFormArray(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  private initForm(): void {
    this.form = this.fb.group({
      rows: this.fb.array([])
    });

    this.populateData(this.initialData);

    this.valueChangesSub?.unsubscribe();
    this.valueChangesSub = this.form.valueChanges.subscribe(() => {
      this.dataChange.emit(this.rowsFormArray.value);
      this.validityChange.emit(this.form.valid);
    });
  }

  private populateData(data: any[]): void {
    if (!this.form) return;

    this.rowsFormArray.clear();
    if (data && data.length > 0) {
      data.forEach(item => {
        this.rowsFormArray.push(this.createRow(item));
      });
    } else if (this.config.minRows && this.config.minRows > 0) {
      for (let i = 0; i < this.config.minRows; i++) {
        this.rowsFormArray.push(this.createRow());
      }
    }
  }

  createRow(data?: any): FormGroup {
    const group: Record<string, FormControl> = {};

    this.config.columns.forEach(col => {
      const validators = [];

      if (col.required) {
        if (col.type === 'checkbox') {
          // Checkbox required typically means must be true, but in tables it's usually boolean
        } else {
          validators.push(Validators.required);
        }
      }

      if (col.type === 'email') {
        validators.push(Validators.email);
      }

      if (col.min !== undefined) {
        validators.push(Validators.min(col.min));
      }

      if (col.max !== undefined) {
        validators.push(Validators.max(col.max));
      }

      if (col.minLength !== undefined) {
        validators.push(Validators.minLength(col.minLength));
      }

      if (col.maxLength !== undefined) {
        validators.push(Validators.maxLength(col.maxLength));
      }

      if (col.pattern) {
        validators.push(Validators.pattern(col.pattern));
      }

      const rawVal = data && data[col.key] !== undefined
        ? data[col.key]
        : (col.defaultValue !== undefined ? col.defaultValue : (col.type === 'checkbox' ? false : ''));

      group[col.key] = new FormControl(
        { value: rawVal, disabled: !!col.disabled },
        validators
      );
    });

    return this.fb.group(group);
  }

  addRow(data?: any): void {
    if (this.config.maxRows && this.rowsFormArray.length >= this.config.maxRows) {
      return;
    }
    const newRow = this.createRow(data);
    this.rowsFormArray.push(newRow);
    this.rowAdded.emit(newRow.value);
    this.dataChange.emit(this.rowsFormArray.value);
    this.validityChange.emit(this.form.valid);
  }

  duplicateRow(index: number): void {
    if (this.config.maxRows && this.rowsFormArray.length >= this.config.maxRows) {
      return;
    }
    const sourceData = this.rowsFormArray.at(index).value;
    const duplicatedRow = this.createRow({ ...sourceData });
    this.rowsFormArray.insert(index + 1, duplicatedRow);
    this.rowAdded.emit(duplicatedRow.value);
    this.dataChange.emit(this.rowsFormArray.value);
    this.validityChange.emit(this.form.valid);
  }

  removeRow(index: number): void {
    if (this.config.minRows && this.rowsFormArray.length <= this.config.minRows) {
      return;
    }
    const removedData = this.rowsFormArray.at(index).value;
    this.rowsFormArray.removeAt(index);
    this.rowRemoved.emit({ index, data: removedData });
    this.dataChange.emit(this.rowsFormArray.value);
    this.validityChange.emit(this.form.valid);
  }

  clearAll(): void {
    this.rowsFormArray.clear();
    this.dataChange.emit([]);
    this.validityChange.emit(this.form.valid);
  }

  resetToInitial(): void {
    this.populateData(this.initialData);
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.dataChange.emit(this.rowsFormArray.value);
    this.validityChange.emit(this.form.valid);
  }

  markAllAsTouched(): void {
    this.form.markAllAsTouched();
  }

  isFieldInvalid(rowIndex: number, colKey: string): boolean {
    const row = this.rowsFormArray.at(rowIndex);
    if (!row) return false;
    const ctrl = row.get(colKey);
    return !!(ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty));
  }

  getErrorMessage(rowIndex: number, colKey: string, col: TableColumnConfig): string {
    const row = this.rowsFormArray.at(rowIndex);
    if (!row) return '';
    const ctrl = row.get(colKey);
    if (!ctrl || !ctrl.errors) return '';

    if (ctrl.errors['required']) {
      return `${col.label} is required`;
    }
    if (ctrl.errors['email']) {
      return 'Enter a valid email address';
    }
    if (ctrl.errors['min']) {
      return `Minimum allowed value is ${col.min}`;
    }
    if (ctrl.errors['max']) {
      return `Maximum allowed value is ${col.max}`;
    }
    if (ctrl.errors['minlength']) {
      return `Minimum ${col.minLength} characters required`;
    }
    if (ctrl.errors['maxlength']) {
      return `Maximum ${col.maxLength} characters allowed`;
    }
    if (ctrl.errors['pattern']) {
      return col.patternMessage || 'Invalid format';
    }
    return 'Invalid value';
  }

  getControl(rowIndex: number, colKey: string): FormControl {
    return this.rowsFormArray.at(rowIndex).get(colKey) as FormControl;
  }

  trackByIndex(index: number): number {
    return index;
  }

  updateRowField(rowIndex: number, colKey: string, value: any, emitEvent = true): void {
    const row = this.rowsFormArray.at(rowIndex);
    if (!row) return;
    const ctrl = row.get(colKey);
    if (ctrl && ctrl.value !== value) {
      ctrl.setValue(value, { emitEvent });
    }
  }

  setRows(data: any[]): void {
    this.populateData(data);
    this.dataChange.emit(this.rowsFormArray.value);
    this.validityChange.emit(this.form.valid);
  }
}
