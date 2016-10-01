import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        loadChildren: 'app/profile/profile.module#ProfileModule'
    },
    {
        path: 'signin',
        loadChildren: 'app/signin/signin.module#SignInModule'
    }
];

export const AppRouterProvider: ModuleWithProviders = RouterModule.forRoot(appRoutes);