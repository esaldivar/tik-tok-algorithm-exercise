import { Routes } from '@angular/router';
import { IdeComponent } from './components/ide/ide.component';

export const routes: Routes = [
  { path: '', redirectTo: '/ide', pathMatch: 'full' },
  { path: 'ide', component: IdeComponent }
];
