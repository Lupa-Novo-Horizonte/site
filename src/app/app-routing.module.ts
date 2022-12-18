import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizationComponent } from './visualization/visualization.component';
import { SharingComponent } from './sharing/sharing.component';
import { AboutComponent } from './about/about.component';
//import { LoginComponent } from './login/login.component';
//import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

const routes: Routes = [
  {path: '', component: HomeLayoutComponent, children:[
    {path: '', component: VisualizationComponent},
    {path: 'sharing', component: SharingComponent},
    {path: 'about', component: AboutComponent}
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
