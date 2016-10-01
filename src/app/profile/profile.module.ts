import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProfileComponent} from "./profile.component";
import {ProfileRouterProvider} from "./profile.routes";
import {AuthService} from "../shared/auth.service";
import {AuthGuard} from "../shared/auth-guard.service";

@NgModule({
    imports: [
        CommonModule,
        ProfileRouterProvider
    ],
    declarations: [
        ProfileComponent
    ],
    providers: [
        AuthService,
        AuthGuard
    ]
})

export class ProfileModule {}