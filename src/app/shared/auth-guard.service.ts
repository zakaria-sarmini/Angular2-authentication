import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {AuthService} from "./auth.service";
import "rxjs/Rx";
import {LocalStorageService} from "ng2-webstorage/index";

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private _authService:AuthService, private _router:Router, private _storage: LocalStorageService){}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean {
        return this._authService.getUser().map(user => {
            if (user) {
                this._storage.store('isLoggedIn', true);
                return true
            } else {
                this._storage.store('isLoggedIn', false);
                this._storage.store('errMsg', 'You must be logged in to see your profile !');
                this._router.navigate(['auth'])
            }
        }).first()
    }
}