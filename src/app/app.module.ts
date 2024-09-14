import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TestpageComponent } from './pages/testpage/testpage.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RequestServerDetailComponent } from './pages/request-server-detail/request-server-detail.component';
import { FormsModule, NgForm , ReactiveFormsModule} from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { NewRequestServerComponent } from './pages/new-request-server/new-request-server.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonToggleModule} from '@angular/material/button-toggle'
import { MatDividerModule } from "@angular/material/divider"
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { ClipboardModule} from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTabsModule } from '@angular/material/tabs'
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDialogModule } from '@angular/material/dialog';
import { Jwtinterceptor } from './_interceptors/jwtinterceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { Page401Component } from './pages/_errorPages/page401/page401.component';
import { LogsComponent } from './pages/logs/logs.component';
import { LoginComponent } from './pages/login/login.component';
import { ServerlistComponent } from './pages/serverlist/serverlist.component';
import { NetworksComponent } from './pages/networks/networks.component';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        TestpageComponent,
        RequestServerDetailComponent,
        DashboardComponent,
        HomeComponent,
        NewRequestServerComponent,
        SettingsComponent,
        Page401Component,
        LogsComponent,
        LoginComponent,
        ServerlistComponent,
        NetworksComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor,multi:true},
        {provide: HTTP_INTERCEPTORS, useClass:Jwtinterceptor,multi:true},
        {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor,multi:true}
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        CommonModule,
        HttpClientModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatSlideToggleModule,
        ClipboardModule,
        MatSnackBarModule,
        MatStepperModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatDialogModule

    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
