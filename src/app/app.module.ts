import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRouterProvider} from "./app.routes";
import {AuthModule} from "./auth/auth.module";
import {Ng2Webstorage} from "ng2-webstorage/index";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AuthModule,
        AppRouterProvider,
        Ng2Webstorage  // local storage manager
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
