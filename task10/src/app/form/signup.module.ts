import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';


console.warn("Children loaded");
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
