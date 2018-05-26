import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
  path: '',
  redirectTo: 'authentication',
  pathMatch: 'prefix',
}, {
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: 'teacher',
    loadChildren: './teacher/teacher.module#TeacherModule'
  }, {
    path: 'home',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule'
  }, {
    path: 'apps',
    loadChildren: './apps/apps.module#AppsModule'
  }, {
    path: 'features',
    loadChildren: './features/features.module#FeaturesModule'
  }, {
    path: 'material',
    loadChildren: './material/material.module#MaterialComponentsModule'
  }, {
    path: 'icons',
    loadChildren: './icons/icons.module#IconsModule'
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormModule'
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule'
  }, {
    path: 'charts',
    loadChildren: './chartlib/chartlib.module#ChartlibModule'
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapModule'
  }, {
    path: 'cards',
    loadChildren: './cards/cards.module#CardsDemoModule'
  }, {
    path: 'pages',
    loadChildren: './custom-pages/pages.module#PagesDemoModule'
  }, {
    path: 'user-pages',
    loadChildren: './user-pages/users.module#UsersModule'
  }, {
    path: 'gallery',
    loadChildren: './gallery/gallery.module#GalleryDemoModule'
  }, {
    path: 'ecommerce',
    loadChildren: './ecommerce/ecommerce.module#EcommerceDemoModule'
  }]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'authentication',
    loadChildren: './session/session.module#SessionModule'
  }, {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  }]
}, {
  path: '**',
  redirectTo: 'session/404'
}];
