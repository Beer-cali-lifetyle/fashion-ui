import { Route, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';

export const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes')
    },
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./modules/app.routes')
            },
            //   {
            //     path: 'bd',
            //     loadChildren: () => import('./modules/business-development/bd.routes')
            //   },
            //   {
            //     path: 'operations',
            //     loadChildren: () => import('./modules/operations/operations.routes')
            //   },
        ]
    },
    {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];
