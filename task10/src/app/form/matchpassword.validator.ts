import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const matchpassword : ValidatorFn = (control: AbstractControl):ValidationErrors|null=> {
    let password = control.get('pass1')
    let cpassword = control.get('pass2')
    if(password && cpassword && password?.value !== cpassword?.value){
        return {
            passwordmatcherror : true
        }
    }
    return null;
}