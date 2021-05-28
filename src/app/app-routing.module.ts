import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboards/dashboard/dashboard.component';
import { MachinesComponent } from './components/dashboards/machines/machines.component';
import { SuperAdminDashboardComponent } from './components/dashboards/super-admin-dashboard/super-admin-dashboard.component';
import { UpdateHistoryComponent } from './components/update-history/update-history.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { LoginGuardService } from './services/guards/login-guard.service';
import { SuperAdminGuardService } from './services/guards/super-admin-guard.service';

const routes: Routes = [
  { path: "", component: LoginComponent, canActivate: [LoginGuardService]},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: "machines/:id", component: MachinesComponent, canActivate: [AuthGuardService]},
  { path: "users", component: SuperAdminDashboardComponent, canActivate: [AuthGuardService, SuperAdminGuardService]},
  { path: "history", component: UpdateHistoryComponent, canActivate: [AuthGuardService, SuperAdminGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
