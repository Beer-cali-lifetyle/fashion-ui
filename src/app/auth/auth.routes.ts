
import { Routes } from '@angular/router';


const AuthRoutes: Routes = [
    {
        path: '', redirectTo: 'sign-in', pathMatch: 'full'
    },
    {
        path: 'sign-in', loadComponent: () => import('./sign-up/sign-up.component').then(c => c.SignUpComponent)
    },
    {
        path: 'sign-up', loadComponent: () => import('./sign-in/sign-in.component').then(c => c.SignInComponent)
    },

]

export default AuthRoutes