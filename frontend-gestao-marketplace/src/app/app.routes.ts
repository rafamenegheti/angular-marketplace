import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { Layout } from './pages/layout/layout';
import { NewProduct } from './pages/new-product/new-product';
import { authGaurd } from './guards/auth-gaurd';
import { loginAuthGuard } from './guards/login-auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [loginAuthGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Layout,
    canActivateChild: [authGaurd],
    children: [
      {
        path: 'products',
        component: Products,
      },
      {
        path: 'new-product',
        component: NewProduct,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
