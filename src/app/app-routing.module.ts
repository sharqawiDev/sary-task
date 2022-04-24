import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SplashComponent } from './pages/splash/splash.component';

const routes: Routes = [
  {
    path: '',
    component: SplashComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
