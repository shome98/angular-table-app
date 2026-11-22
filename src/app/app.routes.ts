import { Routes } from '@angular/router';
import { StandardTablesPageComponent } from './pages/standard-tables-page/standard-tables-page.component';
import { ConnectedTablesPageComponent } from './pages/connected-tables-page/connected-tables-page.component';

export const routes: Routes = [
  {
    path: '',
    component: StandardTablesPageComponent,
    title: 'Standard Tables - 5 Config Forms'
  },
  {
    path: 'connected',
    component: ConnectedTablesPageComponent,
    title: 'Connected Tables - Master & 4 Synced Forms'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
