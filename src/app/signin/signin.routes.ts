import {Routes, RouterModule} from "@angular/router";
import {SigninComponent} from "./signin.component";
import {ModuleWithProviders} from "@angular/core";

const signInRoutes: Routes = [
    {
        path: '',
        component: SigninComponent
    }
];

export const SignInRouterProvider: ModuleWithProviders = RouterModule.forChild(signInRoutes);