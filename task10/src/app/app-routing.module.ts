import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',loadChildren:()=>import('src/app/form/signup.module').then(mod=>mod.SignupModule)
  },
  {
    path:'form',loadChildren:()=>import('src/app/form/signup.module').then(mod=>mod.SignupModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
