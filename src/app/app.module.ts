import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';

import {MatListModule} from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';  
import { MatCheckboxModule } from '@angular/material/checkbox';  
import { MatSelectModule } from '@angular/material/select';  
import { MatTableModule } from '@angular/material/table';
import { SignoutComponent } from './components/signout/signout.component';
import { ForgotpwdComponent } from './components/forgotpwd/forgotpwd.component';
import { FormGroup,Validators, FormBuilder, FormControl,Validator } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpdtComponent } from './components/empdt/empdt.component'; 

import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangePwdComponent } from './components/change-pwd/change-pwd.component';
import { OtpComponent } from './components/otp/otp.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, } from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AbstractControl,ValidatorFn } from '@angular/forms';
import {  HttpClientModule} from '@angular/common/http';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoutComponent } from './components/logout/logout.component'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { LoginOTPComponent } from './components/login-otp/login-otp.component';
import { ResetpwdComponent } from './components/resetpwd/resetpwd.component';
import { UpdateempComponent } from './components/updateemp/updateemp.component';
import { DeleteempComponent } from './components/deleteemp/deleteemp.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,       
    SignoutComponent, 
    ForgotpwdComponent,
     EmpdtComponent,   
     ChangePwdComponent,
     OtpComponent,
     HomepageComponent,
     ProfileComponent,
     LogoutComponent,
     LoginOTPComponent,
     ResetpwdComponent,
     UpdateempComponent,
     DeleteempComponent,
     
 
  ],
  entryComponents :[
    OtpComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,  
    MatInputModule,  
    MatSelectModule,  
    MatTableModule,   
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    HttpClientModule,
    NgOtpInputModule,
    MatSnackBarModule,
    MatRadioModule
    
 
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
