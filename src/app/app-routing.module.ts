import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignoutComponent } from './components/signout/signout.component';
import { ForgotpwdComponent } from '../app/components/forgotpwd/forgotpwd.component';
import { EmpdtComponent } from './components/empdt/empdt.component'; 
import { LoginComponent } from './components/login/login.component';
import { ChangePwdComponent } from './components/change-pwd/change-pwd.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OtpComponent } from './components/otp/otp.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginOTPComponent } from './components/login-otp/login-otp.component'; 
import { UpdateempComponent } from './components/updateemp/updateemp.component';
import { DeleteempComponent } from './components/deleteemp/deleteemp.component';

const routes: Routes = [
   {path:"signup", component:SignoutComponent}, 
  { path: "empdetails", component: EmpdtComponent },
  { path: "login", component: LoginComponent},
  { path: "forgot", component: ForgotpwdComponent},
  { path: "changepassword", component: ChangePwdComponent},
  { path: "homepage", component: HomepageComponent},
  { path: "otp", component: OtpComponent},
  { path: "profile", component: ProfileComponent},
  { path: "logout", component: LogoutComponent},
  {path: "loginotp", component:LoginOTPComponent},
  {path: "updt", component:UpdateempComponent},
  {path: "del", component:DeleteempComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
