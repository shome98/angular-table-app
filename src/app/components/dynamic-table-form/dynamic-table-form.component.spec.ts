import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicTableFormComponent } from './dynamic-table-form.component';
import { TableFormConfig } from './dynamic-table-form.types';

describe('DynamicTableFormComponent', () => {
  let component: DynamicTableFormComponent;
  let fixture: ComponentFixture<DynamicTableFormComponent>;

  const mockConfig: TableFormConfig = {
    id: 'test-table',
    title: 'Test Table',
    columns: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'age', label: 'Age', type: 'number', required: false, min: 18 },
      { key: 'active', label: 'Active', type: 'checkbox', defaultValue: true }
    ],
    addBtnText: 'Add Record'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicTableFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicTableFormComponent);
    component = fixture.componentInstance;
    component.config = mockConfig;
    component.initialData = [
      { name: 'Alice', age: 28, active: true },
      { name: 'Bob', age: 34, active: false }
    ];
    fixture.detectChanges();
  });

  it('should create the dynamic table form component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize rows based on initialData', () => {
    expect(component.rowsFormArray.length).toBe(2);
    expect(component.rowsFormArray.at(0).get('name')?.value).toBe('Alice');
    expect(component.rowsFormArray.at(1).get('name')?.value).toBe('Bob');
  });

  it('should add a new row when addRow is called', () => {
    component.addRow();
    expect(component.rowsFormArray.length).toBe(3);
  });

  it('should duplicate a row when duplicateRow is called', () => {
    component.duplicateRow(0);
    expect(component.rowsFormArray.length).toBe(3);
    expect(component.rowsFormArray.at(1).get('name')?.value).toBe('Alice');
  });

  it('should remove a row when removeRow is called', () => {
    component.removeRow(0);
    expect(component.rowsFormArray.length).toBe(1);
    expect(component.rowsFormArray.at(0).get('name')?.value).toBe('Bob');
  });

  it('should clear all rows when clearAll is called', () => {
    component.clearAll();
    expect(component.rowsFormArray.length).toBe(0);
  });

  it('should validate required fields properly', () => {
    component.addRow({ name: '', age: 25, active: true });
    const lastIndex = component.rowsFormArray.length - 1;
    const nameCtrl = component.rowsFormArray.at(lastIndex).get('name');
    nameCtrl?.markAsTouched();
    expect(nameCtrl?.invalid).toBeTrue();
    expect(component.isFieldInvalid(lastIndex, 'name')).toBeTrue();
  });
});
