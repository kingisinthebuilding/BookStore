import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OtpComponent } from './components/otp/otp.component';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/book/book.component';
import { AuthorComponent } from './components/author/author.component';
import { AuthGuard } from './auth.guard';
import { MaintainenceComponent } from './components/maintainence/maintainence.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'otp-verification',
    component: OtpComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        pathMatch:'full'
      },
      {
        path: 'book',
        component: BookComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'author',
        component: AuthorComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'maintainence',
        component: MaintainenceComponent,
        canActivate: [AuthGuard],
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }