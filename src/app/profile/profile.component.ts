import {
    Component, OnInit, OnDestroy, HostBinding, trigger, state, style, transition, animate,
    keyframes
} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {AngularFire, FirebaseObjectObservable} from "angularfire2/index";
import "rxjs/Rx"
import {Subscription} from "rxjs/Rx";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    outputs: ['onTitleChange'],
    animations: [
        trigger('routeAnimation', [
            state('*', style({opacity: 1, transform: 'translateX(0)'})),
            transition('void => *', [
                animate('0.3s 0.3s', keyframes([
                    style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
                    style({opacity: 1, transform: 'translateX(25px)', offset: 0.3}),
                    style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
                ]))
            ]),
            transition('* => void', [
                animate('0.3s', keyframes([
                    style({opacity: 1, transform: 'translateX(0)', offset: 0}),
                    style({opacity: 1, transform: 'translateX(-25px)', offset: 0.3}),
                    style({opacity: 0, transform: 'translateX(100%)', offset: 1})
                ]))
            ])
        ])
    ]
})
export class ProfileComponent implements OnInit, OnDestroy {

    @HostBinding('@routeAnimation') get routeAnimation() {
        return true;
    }

    @HostBinding('style.position') get position() {
        return 'absolute';
    }

    @HostBinding('style.width') get width() {
        return '100%';
    }

    public date:number = Date.now();
    public provider:number;
    public user: FirebaseObjectObservable<any>;
    public userSubscription:Subscription; // saving subscription before destroying the component

    constructor(private _authService:AuthService, private _af:AngularFire, private _title:Title) {
    }

    logout() {
        this._authService.logout();
    }

    ngOnInit() {
        this.userSubscription = this._authService.getUser().subscribe(user => { //getting user's information
            this.provider = user.provider;
            this._af.database.object('/profiles/' + user.auth.uid).subscribe(data => {
                if (data.$value === null) {
                    this._af.database.object('/profiles/' + data.$key).set({
                        displayName: user.auth.displayName,
                        email: user.auth.email,
                        birth: {day: '', month: '', year: ''},
                        gender: '',
                        photoURL: user.auth.photoURL
                    })
                }
            });
            this.user = this._af.database.object('/profiles/' + user.auth.uid);
        });

        this._title.setTitle('profile');
    }

    ngOnDestroy():void {  //preventing memory leaks
        this.userSubscription.unsubscribe();
    }
}
