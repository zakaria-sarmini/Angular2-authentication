import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../shared/custom-validators";
import {AuthService} from "../../shared/auth.service";

@Component({
    selector: 'app-manual',
    templateUrl: './manual.component.html',
    styleUrls: ['./manual.component.css']
})
export class ManualComponent implements OnInit {

    signUpForm:FormGroup;

    public userInfo = {};


    constructor(private _fb:FormBuilder, private _authService:AuthService) {
    }

    onSubmit(userInfo) {
        this._authService.signUp(userInfo.email, userInfo.password, userInfo.firstname, userInfo.lastname, userInfo.birthDate, userInfo.gender)
    }

    ngOnInit() {
        this.buildForm();
    }

    buildForm():void {
        this.signUpForm = this._fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required, CustomValidators.passwordCheck]],
            birthDate: this._fb.group({
                month: ['', [Validators.required]],
                day: ['', [Validators.required]],
                year: ['', [Validators.required]],
            }),
            gender: ['M']
        });
        this.signUpForm.valueChanges
            .subscribe(data=> this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?:any) {
        if (!this.signUpForm) {
            return;
        }
        const form = this.signUpForm;
        for (const field in this.formErros) {
            this.formErros[field] = '';
            const control = form.get(field);
            if (control && !control.valid && control.dirty) {
                const message = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErros[field] = message[key] + ' ';
                }
            }
        }
    }

    formErros = {
        'firstname': '',
        'lastname': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    };

    validationMessages = {
        'firstname': {
            'required': 'First name field must not be empty...',
            'pattern': 'First name must not contain numbers or special characters...'
        },
        'lastname': {
            'required': 'Your last name is required...',
            'pattern': 'Last name must not contain numbers or special characters...'
        },
        'email': {
            'required': 'Please enter your email address...',
            'pattern': "You've entered an invalid Email..."
        },
        'password': {
            'required': 'Please specify a password...',
            'pattern': 'Your password should be between 8 to 15 characters and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character(*_/()><.$%)'
        },
        'confirmPassword': {
            'required': 'Please confirm your password...',
            'unmatch': 'Passwords unmatch'
        }
    }

}
