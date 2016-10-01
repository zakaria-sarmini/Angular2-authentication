import {Injectable} from "@angular/core";
import {AngularFire, AuthMethods, AuthProviders} from "angularfire2/index";
import {Router} from "@angular/router";
import 'rxjs/Rx'
import {LocalStorageService} from "ng2-webstorage/index";

@Injectable()

export class AuthService {

    constructor(private _af:AngularFire, private _router:Router, private _storage:LocalStorageService) {
    }

    getUser() {
        return this._af.auth
    }

    signUp(email:string, password:string, firstname:string, lastname:string, birthDate:any, gender:string):void {
        this._af.auth.createUser({
            email: email,
            password: password,
        }).then((user) => {
            this._af.database.object('/profiles/' + user.auth.uid).set({  //adding user to firebase
                displayName: firstname + ' ' + lastname,
                email: user.auth.email,
                birth: birthDate,
                gender: gender,
                photoURL: 'https://pixabay.com/static/uploads/photo/2013/07/13/12/07/avatar-159236_960_720.png'
            });
            this._router.navigate(['profile'])
        }, (error) => {
            console.trace(error);
            this._storage.store('errMsg', error.message);
            this._router.navigate(['auth'])
        })
    }

    login(source:string):void {
        this._af.auth.login({
            provider: this.providerSet(source),
            method: AuthMethods.Popup
        }).then(()=> {
                this._router.navigate(['profile'])
            }, error => {
                console.trace(error);
                this._storage.store('errMsg', error.message);
                this._router.navigate(['auth'])
            }
        )
    }

    logout():void {
        this._af.auth.logout();
        this._router.navigate(['auth']);
        this._storage.store('isLoggedIn', false);
    }

    providerSet(source) {
        switch (source) {
            case 'Google':
                return AuthProviders.Google;
            case 'Facebook':
                return AuthProviders.Facebook;
        }
    }
}