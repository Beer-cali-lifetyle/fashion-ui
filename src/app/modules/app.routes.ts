
import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';


const ModuleRoutes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', loadComponent: () => import('./index').then(c => c.HomeComponent)
    },
    {
        path: 'shop', loadComponent: () => import('./index').then(c => c.ShopListComponent), canActivate: [AuthGuard]
    },
    {
        path: 'collection', loadComponent: () => import('./index').then(c => c.CollectionComponent)
    },
    {
        path: 'contact', loadComponent: () => import('./index').then(c => c.ContactComponent)
    }
]

export default ModuleRoutes