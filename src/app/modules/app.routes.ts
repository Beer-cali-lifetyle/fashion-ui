
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
        path: 'shop', loadComponent: () => import('./index').then(c => c.ShopListComponent)
    },
    {
        path: 'shop/product/:id', loadComponent: () => import('./index').then(c => c.ProductInfoComponent)
    },
    {
        path: 'collection', loadComponent: () => import('./index').then(c => c.CollectionComponent)
    },
    {
        path: 'wishlist', canActivate: [AuthGuard], loadComponent: () => import('./index').then(c => c.WishlistComponent)
    },
    {
        path: 'profile', canActivate: [AuthGuard], loadComponent: () => import('./index').then(c => c.ProfileComponent)
    },
    {
        path: 'contact', loadComponent: () => import('./index').then(c => c.ContactComponent)
    },
    {
        path: 'shopping-cart', canActivate: [AuthGuard], loadComponent: () => import('./index').then(c => c.ShoppingCartComponent)
    },
    {
        path: 'checkout', canActivate: [AuthGuard], loadComponent: () => import('./index').then(c => c.CheckoutComponent)
    },
    {
        path: 'magazines', loadComponent: () => import('./index').then(c => c.BlogListComponent)
    },
    {
        path: 'magazines/:id', loadComponent: () => import('./index').then(c => c.BlogComponent)
    },
    {
        path: 'orders', canActivate: [AuthGuard], loadComponent: () => import('./index').then(c => c.OrdersComponent)
    },
]

export default ModuleRoutes