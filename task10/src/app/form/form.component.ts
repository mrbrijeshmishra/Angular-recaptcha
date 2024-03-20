import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../service/http/http.service';
import { matchpassword } from './matchpassword.validator';
import { ApiMethod, AuthEndPoints } from '../constant/api-constant';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  title = "ONGC Dummy";
  signUpForm: FormGroup;
  Category: any;
  categoryReceived: any;
  subCategory: any;
  subCat: any;
  subCategoryReceived: any;
  showPassword: boolean;
  jsondata: any = {
    catid: null
  }

  constructor(private userService: HttpService,
    private recaptchaV3Service: ReCaptchaV3Service) {
    this.signUpForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      mobileN: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      organization: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      subcategory: new FormControl(''),
      pass1: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      pass2: new FormControl('', [Validators.required]),
      show: new FormControl(''),
      policy: new FormControl('', [Validators.required])
    },
      {
        validators: matchpassword
      }
    );

    this.showPassword = false;

    // Api fetching of member
    this.userService.requestCall(AuthEndPoints.REGISTER_USER, ApiMethod.POST).subscribe(data => {
      this.Category = data;
      // console.log(this.Category);
      this.categoryReceived = this.Category.data;
      // console.log(this.categoryReceived);
    });
    
    this.requestDataFromMultipleSources().subscribe((responseList) => {
      console.log('responseList')
      console.log(responseList[0])
    });
  }


  public requestDataFromMultipleSources(): Observable<any[]> {
    let response1 = this.recaptchaV3Service.execute("importantAction");
    return forkJoin([response1])
  }



  signUp() {
    if (this.signUpForm.valid) {
      // const filterData = this.signUpForm.value;
      console.log("Form Submitted")
      console.log(this.signUpForm.value)
    } else {
      alert("Form Invalid")
    };
    this.showPassword = false;
    this.signUpForm.reset()
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  clickMethod(id: number) {
    this.jsondata.catid = id;
    this.subCat = id;
    if (this.jsondata.catid === 3) {
      this.userService.requestCall(AuthEndPoints.SubUserCategory, ApiMethod.POST, this.jsondata)
        .subscribe((result: any) => this.subCategoryReceived = result?.data)
    }
  }

  get fname() {
    return this.signUpForm.get('fname')
  }
  get lname() {
    return this.signUpForm.get('lname')
  }
  get mobileN() {
    return this.signUpForm.get('mobileN')
  }
  get email() {
    return this.signUpForm.get('email')
  }
  get organization() {
    return this.signUpForm.get('organization')
  }
  get show() {
    return this.signUpForm.get('show')
  }
  get policy() {
    return this.signUpForm.get('policy')
  }
  get pass1() {
    return this.signUpForm.get('pass1')
  }
  get pass2() {
    return this.signUpForm.get('pass2')
  }
}



