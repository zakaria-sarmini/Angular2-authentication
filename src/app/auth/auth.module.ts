import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthRouterProvider} from "./auth.routes";
import {AuthComponent} from "./auth.component";
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2/index";
import {AuthService} from "../shared/auth.service";
import { ManualComponent } from './manual/manual.component';
import {ReactiveFormsModule} from "@angular/forms";

const firebaseConfig = {
    apiKey: "YOUR-API-KEY",
    authDomain: "YOUR-AUTH-DOMAIN",
    databaseURL: "YOUR-DATABASE-URL",
    storageBucket: "YOUR-STORAGE-BUCKET",
    messagingSenderId: "YOUR-THING:)"
};

@NgModule({
    imports: [
        CommonModule,
        AuthRouterProvider,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(firebaseConfig, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        })
    ],
    declarations: [
        AuthComponent, ManualComponent
    ],
    providers: [
        AuthService
    ],
    exports: [AuthComponent, ManualComponent]
})

export class AuthModule {}