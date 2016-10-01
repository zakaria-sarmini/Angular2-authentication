import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SigninComponent} from "./signin.component";
import {SignInRouterProvider} from "./signin.routes";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SignInRouterProvider
    ],
    declarations: [
        SigninComponent
    ]
})

export class SignInModule {}