import {Component, OnInit} from '@angular/core';
import {LocalStorageService, LocalStorage} from "ng2-webstorage/index";
import {AuthService} from "./shared/auth.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    @LocalStorage('isLoggedIn') //getting data from local storage as observable
    public status;              //binding data to 'status' to manipulate the navbar

    constructor(private _storage: LocalStorageService, private _authService: AuthService, private _title: Title){

    }

    logout():void{
        this._authService.logout();
    }

    ngOnInit():void {
        this._storage.store('isLoggedIn', false);
        this._title.setTitle('authentication');
    }
}
