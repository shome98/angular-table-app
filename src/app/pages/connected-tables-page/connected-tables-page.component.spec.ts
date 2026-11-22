import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectedTablesPageComponent } from './connected-tables-page.component';

describe('ConnectedTablesPageComponent', () => {
  let component: ConnectedTablesPageComponent;
  let fixture: ComponentFixture<ConnectedTablesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectedTablesPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectedTablesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the connected tables page component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 connected table configurations', () => {
    expect(component.configs.length).toBe(5);
    expect(component.configs[0].id).toBe('master');
    expect(component.configs[1].id).toBe('department');
    expect(component.configs[2].id).toBe('vendor');
    expect(component.configs[3].id).toBe('schedule');
    expect(component.configs[4].id).toBe('audit');
  });

  it('should have initial dummy data populated for all 5 tables', () => {
    expect(component.currentData['master'].length).toBe(3);
    expect(component.currentData['department'].length).toBe(3);
    expect(component.currentData['vendor'].length).toBe(3);
    expect(component.currentData['schedule'].length).toBe(3);
    expect(component.currentData['audit'].length).toBe(3);
  });

  it('should add rows to next 4 tables when master row is added', () => {
    component.onMasterRowAdded({
      title: 'New Infrastructure Project',
      type: 'Security & Compliance',
      amount: 50000
    });

    expect(component.deptComp?.rowsFormArray.length).toBe(4);
    expect(component.vendorComp?.rowsFormArray.length).toBe(4);
    expect(component.scheduleComp?.rowsFormArray.length).toBe(4);
    expect(component.auditComp?.rowsFormArray.length).toBe(4);

    // Verify type and amount are connected to row in table 2
    const lastDeptRow = component.deptComp?.rowsFormArray.at(3).value;
    expect(lastDeptRow.type).toBe('Security & Compliance');
    expect(lastDeptRow.amount).toBe(50000);
  });
});
