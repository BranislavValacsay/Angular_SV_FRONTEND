import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestpageComponent } from './pages/testpage/testpage.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RequestServerDetailComponent } from './pages/request-server-detail/request-server-detail.component';
import { NewRequestServerComponent } from './pages/new-request-server/new-request-server.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { authGuard } from './_authguard/auth.guard';
import { Page401Component } from './pages/_errorPages/page401/page401.component';
import { LogsComponent } from './pages/logs/logs.component';
import { LoginComponent } from './pages/login/login.component';
import { ServerlistComponent } from './pages/serverlist/serverlist.component';
import { NetworksComponent } from './pages/networks/networks.component';

const routes: Routes = [
  {path:'',component:ServerlistComponent},
  {path:'test',component:TestpageComponent},
  {path:'401',component:Page401Component},
  {path:'login',component:LoginComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[authGuard],
    children:[  
      {path:'home',component:HomeComponent},
      {path:'dashboard',component:DashboardComponent},
      {path:'serverlist',component:ServerlistComponent},
      {path:'request-detail/:url',component:RequestServerDetailComponent},
      {path:'settings',component:SettingsComponent},
      {path:'new_request_server',component:NewRequestServerComponent},
      {path:'logs',component:LogsComponent},
      {path:'networks',component:NetworksComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
