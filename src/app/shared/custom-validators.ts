import {FormControl} from "@angular/forms";
export class CustomValidators {
    static passwordCheck(control: FormControl):{[key: string]:boolean}{
        if(control.root.get('password')){
            if(control.root.get('password').value !== control.value){
                return {unmatch: true}
            }
        }
        return null;
    }
}