import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/shared/header/header.component';
import { SideNavComponent } from './components/shared/side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SuperAdminDashboardComponent } from './components/dashboards/super-admin-dashboard/super-admin-dashboard.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboards/dashboard/dashboard.component';
import { MachinesComponent } from './components/dashboards/machines/machines.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateMachineComponent } from './components/dialogs/update-machine/update-machine.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UpdateHistoryComponent } from './components/update-history/update-history.component';
import { AddLineComponent } from './components/dialogs/add-line/add-line.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { UserDialogComponent } from './components/dialogs/user-dialog/user-dialog.component';
import { AddMachineComponent } from './components/dialogs/add-machine/add-machine.component';
import {MatBadgeModule} from '@angular/material/badge';
import { NgxSpinnerModule } from "ngx-spinner";
import { NotFoundComponent } from './components/templates/not-found/not-found.component';
import { UnauthorizedComponent } from './components/templates/unauthorized/unauthorized.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SideNavComponent,
    SuperAdminDashboardComponent,
    DashboardComponent,
    MachinesComponent,
    UpdateMachineComponent,
    UpdateHistoryComponent,
    AddLineComponent,
    ConfirmDialogComponent,
    UserDialogComponent,
    AddMachineComponent,
    NotFoundComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatBadgeModule,
    NgxSpinnerModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
