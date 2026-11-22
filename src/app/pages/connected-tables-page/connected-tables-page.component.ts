import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicTableFormComponent } from '../../components/dynamic-table-form/dynamic-table-form.component';
import { TableFormConfig } from '../../components/dynamic-table-form/dynamic-table-form.types';
import { CONNECTED_TABLE_CONFIGS, CONNECTED_DUMMY_DATA } from './connected-dummy-data';

@Component({
  selector: 'app-connected-tables-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicTableFormComponent],
  templateUrl: './connected-tables-page.component.html',
  styleUrl: './connected-tables-page.component.css'
})
export class ConnectedTablesPageComponent implements OnInit, AfterViewInit {
  @ViewChild('masterTable') masterComp?: DynamicTableFormComponent;
  @ViewChild('deptTable') deptComp?: DynamicTableFormComponent;
  @ViewChild('vendorTable') vendorComp?: DynamicTableFormComponent;
  @ViewChild('scheduleTable') scheduleComp?: DynamicTableFormComponent;
  @ViewChild('auditTable') auditComp?: DynamicTableFormComponent;

  readonly configs: TableFormConfig[] = CONNECTED_TABLE_CONFIGS;
  readonly dummyData: Record<string, any[]> = CONNECTED_DUMMY_DATA;

  // Active Live Data Store
  currentData: Record<string, any[]> = {
    master: [...CONNECTED_DUMMY_DATA['master']],
    department: [...CONNECTED_DUMMY_DATA['department']],
    vendor: [...CONNECTED_DUMMY_DATA['vendor']],
    schedule: [...CONNECTED_DUMMY_DATA['schedule']],
    audit: [...CONNECTED_DUMMY_DATA['audit']]
  };

  validity: Record<string, boolean> = {
    master: true,
    department: true,
    vendor: true,
    schedule: true,
    audit: true
  };

  syncLog: Array<{ time: string; message: string; type: 'add' | 'update' | 'delete' | 'info' }> = [
    {
      time: new Date().toLocaleTimeString(),
      message: 'Initial 3 master allocations synchronized to next 4 tables.',
      type: 'info'
    }
  ];

  activeNavTab: string = 'all';
  showJsonModal: boolean = false;
  copySuccess: boolean = false;
  selectedTableForJson: string = 'all';
  isSyncing: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  // Master Table Event Handlers
  onMasterRowAdded(newRow: any): void {
    const type = newRow?.type || 'Cloud SaaS & Storage';
    const amount = newRow?.amount !== undefined ? newRow.amount : 15000;

    // Synchronize addition to the next 4 tables with their own unique default column values
    this.deptComp?.addRow({
      type,
      amount,
      department: 'Engineering Platform',
      leadPerson: '',
      utilizationPercent: 80,
      headcount: 2
    });

    this.vendorComp?.addRow({
      type,
      amount,
      vendorName: '',
      contractRef: `PO-2026-${Math.floor(100 + Math.random() * 900)}`,
      paymentTerms: 'Net 30',
      taxIncluded: true
    });

    this.scheduleComp?.addRow({
      type,
      amount,
      milestoneGoal: '',
      deliveryQuarter: 'Q2 2026',
      targetDate: '',
      contingencyPercent: 10
    });

    this.auditComp?.addRow({
      type,
      amount,
      riskRating: 'Low Risk',
      complianceStandard: 'SOC 2 Type II',
      auditorName: '',
      auditSignOff: false
    });

    this.addLog(
      `New row added to Table 1 [Type: "${type}", Amount: $${amount}] ➔ Connected to next 4 tables!`,
      'add'
    );
  }

  onMasterRowRemoved(event: { index: number; data: any }): void {
    const idx = event.index;
    this.deptComp?.removeRow(idx);
    this.vendorComp?.removeRow(idx);
    this.scheduleComp?.removeRow(idx);
    this.auditComp?.removeRow(idx);

    this.addLog(
      `Row #${idx + 1} removed from Table 1 ➔ Corresponding row removed from next 4 tables.`,
      'delete'
    );
  }

  onMasterDataChange(masterRows: any[]): void {
    this.currentData['master'] = masterRows;

    if (!masterRows || masterRows.length === 0) return;

    // Propagate type and amount to next 4 tables without overwriting their own column values
    this.isSyncing = true;
    masterRows.forEach((row, i) => {
      const type = row.type;
      const amount = row.amount;

      this.deptComp?.updateRowField(i, 'type', type);
      this.deptComp?.updateRowField(i, 'amount', amount);

      this.vendorComp?.updateRowField(i, 'type', type);
      this.vendorComp?.updateRowField(i, 'amount', amount);

      this.scheduleComp?.updateRowField(i, 'type', type);
      this.scheduleComp?.updateRowField(i, 'amount', amount);

      this.auditComp?.updateRowField(i, 'type', type);
      this.auditComp?.updateRowField(i, 'amount', amount);
    });

    setTimeout(() => {
      this.isSyncing = false;
    }, 400);
  }

  onChildDataChange(tableId: string, data: any[]): void {
    this.currentData[tableId] = data;
  }

  onValidityChange(tableId: string, valid: boolean): void {
    this.validity[tableId] = valid;
  }

  triggerAddMasterRow(): void {
    const sampleTypes = [
      'Cloud SaaS & Storage',
      'Hardware & Infrastructure',
      'Consulting & Staffing',
      'Security & Compliance',
      'R&D Innovation Lab'
    ];
    const randomType = sampleTypes[Math.floor(Math.random() * sampleTypes.length)];
    const randomAmount = (Math.floor(Math.random() * 40) + 10) * 1000;

    this.masterComp?.addRow({
      title: 'Strategic Expansion Phase',
      type: randomType,
      amount: randomAmount,
      fiscalQuarter: 'Q3 2026',
      owner: 'Elena Rostova',
      isApproved: true
    });
  }

  resetAll(): void {
    this.masterComp?.setRows([...CONNECTED_DUMMY_DATA['master']]);
    this.deptComp?.setRows([...CONNECTED_DUMMY_DATA['department']]);
    this.vendorComp?.setRows([...CONNECTED_DUMMY_DATA['vendor']]);
    this.scheduleComp?.setRows([...CONNECTED_DUMMY_DATA['schedule']]);
    this.auditComp?.setRows([...CONNECTED_DUMMY_DATA['audit']]);

    this.addLog('All 5 tables reset to initial dummy dataset.', 'info');
  }

  private addLog(message: string, type: 'add' | 'update' | 'delete' | 'info'): void {
    this.syncLog.unshift({
      time: new Date().toLocaleTimeString(),
      message,
      type
    });
    if (this.syncLog.length > 8) {
      this.syncLog.pop();
    }
  }

  get totalBudget(): number {
    return (this.currentData['master'] || []).reduce(
      (sum, r) => sum + (Number(r.amount) || 0),
      0
    );
  }

  get masterRowCount(): number {
    return this.currentData['master']?.length || 0;
  }

  get allTablesValid(): boolean {
    return Object.values(this.validity).every(v => v);
  }

  openJsonModal(target: string = 'all'): void {
    this.selectedTableForJson = target;
    this.showJsonModal = true;
    this.copySuccess = false;
  }

  closeJsonModal(): void {
    this.showJsonModal = false;
  }

  get jsonExportData(): any {
    if (this.selectedTableForJson === 'all') {
      return {
        mode: 'connected-master-and-4-child-tables',
        exportedAt: new Date().toISOString(),
        syncedFields: ['type', 'amount'],
        masterRowsCount: this.masterRowCount,
        totalBudgetSum: this.totalBudget,
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

  copyJson(): void {
    navigator.clipboard.writeText(this.formattedJson).then(() => {
      this.copySuccess = true;
      setTimeout(() => (this.copySuccess = false), 2500);
    });
  }
}
