import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'register-page',
    loadComponent: () => import('./register-page/register-page.page').then(m => m.RegisterPagePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login-page/login-page.page').then(m => m.LoginPagePage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup-page/signup-page.page').then(m => m.SignupPagePage)
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/auth/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
];
