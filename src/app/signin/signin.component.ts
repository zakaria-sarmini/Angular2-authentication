import {
    Component, OnInit, HostBinding, trigger, state, transition, style, animate, keyframes,
} from '@angular/core';
import {AngularFire} from "angularfire2/index";
import {Router, Params, ActivatedRoute} from "@angular/router";
import "rxjs/add/operator/map";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    /*animations: [
        trigger('routeAnimation', [
            state('*', style({opacity: 1, transform: 'translateX(0)'})),
            transition('void => *', [style({opacity: 0, transform: 'translateX(-100%)'}), animate('0.3s ease-in')]),
            transition('* => void', [animate('0.3s ease-out', style({opacity: 0, transform: 'translateX(-100%)'}))])])
    ]*/
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
                    style({opacity: 1, transform: 'translate(0)', offset: 0}),
                    style({opacity: 1, transform: 'translate(-25)', offset: 0.3}),
                    style({opacity: 0, transform: 'translate(100%)', offset: 1})
                ]))
            ])
        ])
    ]
})
export class SigninComponent implements OnInit {

    @HostBinding('@routeAnimation') get routeAnimation() {
        return true;
    }


    @HostBinding('style.position') get position() {
        return 'absolute';
    }

    @HostBinding('style.width') get width() {
        return '100%';
    }


    public message = {'error': '', 'success': ''};

    public status:boolean = true;

    constructor(private _af:AngularFire, private _router:Router, private _route:ActivatedRoute, private _title:Title) {
    }

    statusChange():void {      //reset password animation
        this.status = false;
    }

    emptyMessages():void {
        this.message.error = '';
        this.message.success = '';
    }

    resetPassword(email:string) {
        console.log(email);
        firebase.auth().sendPasswordResetEmail(email).then(data => this.message.success = 'A Password reset link has been sent to ' + email + ' please check your inbox :)', error => {
            console.trace(error);
            this.message.error = 'The email provided has no account or misspelled !'
        })
    }

    onSubmit(userInfo):void {  //sign in
        this._af.auth.login({
            email: userInfo.email,
            password: userInfo.password
        }).then(user => {
            this._router.navigate(['profile'])
        }, error => {
            console.trace(error);
            this.message.error = error.message
        })
    }

    ngOnInit():void {
        this._route.params.map(params => params['error']).subscribe((params:Params) => {
            params ? this.message.error = params.toString() : this.message.error = ''
        });
        this._title.setTitle('Sign in');  //page title
    }
}
