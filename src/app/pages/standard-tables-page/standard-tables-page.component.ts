import { Component, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicTableFormComponent } from '../../components/dynamic-table-form/dynamic-table-form.component';
import { TableFormConfig } from '../../components/dynamic-table-form/dynamic-table-form.types';
import { TABLE_FORM_CONFIGS, TABLE_DUMMY_DATA } from '../../constants/table-dummy-data';

@Component({
  selector: 'app-standard-tables-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicTableFormComponent],
  templateUrl: './standard-tables-page.component.html',
  styleUrl: './standard-tables-page.component.css'
})
export class StandardTablesPageComponent {
  @ViewChildren(DynamicTableFormComponent) tableComponents!: QueryList<DynamicTableFormComponent>;

  readonly tableConfigs: TableFormConfig[] = TABLE_FORM_CONFIGS;
  readonly tableDummyData: Record<string, any[]> = TABLE_DUMMY_DATA;

  currentData: Record<string, any[]> = { ...TABLE_DUMMY_DATA };
  tableValidity: Record<string, boolean> = {
    employees: true,
    inventory: true,
    tasks: true,
    vendors: true,
    expenses: true
  };

  activeTab: string = 'all';
  showJsonModal: boolean = false;
  copySuccess: boolean = false;
  toastMessage: string | null = null;
  selectedTableForJson: string = 'all';

  onDataChange(tableId: string, data: any[]): void {
    this.currentData[tableId] = data;
  }

  onValidityChange(tableId: string, isValid: boolean): void {
    this.tableValidity[tableId] = isValid;
  }

  get totalRowCount(): number {
    return Object.values(this.currentData).reduce((sum, rows) => sum + (rows?.length || 0), 0);
  }

  get areAllTablesValid(): boolean {
    return Object.values(this.tableValidity).every(v => v);
  }

  get validTablesCount(): number {
    return Object.values(this.tableValidity).filter(v => v).length;
  }

  get filteredConfigs(): TableFormConfig[] {
    if (this.activeTab === 'all') {
      return this.tableConfigs;
    }
    return this.tableConfigs.filter(cfg => cfg.id === this.activeTab);
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  validateAllTables(): void {
    if (this.tableComponents) {
      this.tableComponents.forEach(comp => comp.markAllAsTouched());
    }

    if (this.areAllTablesValid) {
      this.showToast('All 5 table forms are completely valid!');
    } else {
      this.showToast('Validation errors detected in one or more tables.');
    }
  }

  resetAllTables(): void {
    if (this.tableComponents) {
      this.tableComponents.forEach(comp => comp.resetToInitial());
    }
    this.showToast('All 5 tables have been reset to default dummy data.');
  }

  openJsonModal(targetTable: string = 'all'): void {
    this.selectedTableForJson = targetTable;
    this.showJsonModal = true;
    this.copySuccess = false;
  }

  closeJsonModal(): void {
    this.showJsonModal = false;
  }

  get jsonExportData(): any {
    if (this.selectedTableForJson === 'all') {
      return {
        mode: 'standard-5-tables',
        exportedAt: new Date().toISOString(),
        tablesCount: this.tableConfigs.length,
        totalRows: this.totalRowCount,
        tables: this.currentData
      };
    }
    return {
      tableId: this.selectedTableForJson,
      rowsCount: this.currentData[this.selectedTableForJson]?.length || 0,
      data: this.currentData[this.selectedTableForJson] || []
    };
  }

  get formattedJson(): string {
    return JSON.stringify(this.jsonExportData, null, 2);
  }

  copyJsonToClipboard(): void {
    navigator.clipboard.writeText(this.formattedJson).then(() => {
      this.copySuccess = true;
      setTimeout(() => (this.copySuccess = false), 2500);
    });
  }

  downloadJsonFile(): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(this.formattedJson);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `standard-table-forms-${this.selectedTableForJson}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast('JSON export file downloaded successfully!');
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => {
      if (this.toastMessage === message) {
        this.toastMessage = null;
      }
    }, 3500);
  }
}
