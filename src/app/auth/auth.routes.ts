import {Routes, RouterModule} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {ModuleWithProviders} from "@angular/core";

export const authRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent
    }

];

export const AuthRouterProvider: ModuleWithProviders = RouterModule.forChild(authRoutes);