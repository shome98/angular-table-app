import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { TABLE_FORM_CONFIGS } from './constants/table-dummy-data';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load 5 table form configurations', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.tableConfigs.length).toBe(5);
  });

  it('should have initial dummy data populated for all 5 tables', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    TABLE_FORM_CONFIGS.forEach(cfg => {
      expect(app.tableDummyData[cfg.id]).toBeDefined();
      expect(app.tableDummyData[cfg.id].length).toBeGreaterThan(0);
    });
  });

  it('should calculate total row count across all tables', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.totalRowCount).toBeGreaterThan(10);
  });
});
