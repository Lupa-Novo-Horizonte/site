import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizationComponent } from './visualization/visualization.component';
import { SharingComponent } from './sharing/sharing.component';
//import { LoginComponent } from './login/login.component';
//import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { RedirectGuard } from "./redirect.guard";

const routes: Routes = [
  {path: '', component: HomeLayoutComponent, children:[
    {path: '', component: VisualizationComponent},
    {path: 'sharing', component: SharingComponent},
    {path: "about", canActivate: [RedirectGuard], component: VisualizationComponent, data: { externalUrl: "http://lupa.tecccog.net" }} 
  ]},
  /*
  {path: '', component: LoginLayoutComponent, children:[
    {path: 'login', component: LoginComponent}
  ]},
  */
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
