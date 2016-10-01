import {Routes, RouterModule} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from "../shared/auth-guard.service";

export const profileRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: ProfileComponent,
            }
        ]
    }
];

export const ProfileRouterProvider: ModuleWithProviders = RouterModule.forChild(profileRoutes);