
import { Component, OnInit, ViewChildren, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule, } from '@angular/forms';
import { SignoutComponent } from '../signout/signout.component';
import { LoginService } from "../../services/login.service";
import { LoginComponent } from '../login/login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { ForgotpwdComponent } from "../forgotpwd/forgotpwd.component";
import { ResetpwdComponent } from '../resetpwd/resetpwd.component';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.css']
})
export class LoginOTPComponent implements OnInit {

  LoginOtpForm: FormGroup = new FormGroup({});
  user: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  
  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ForgotpwdComponent>,
    private fb: FormBuilder,
    private router: Router,
    private loginservice: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: ForgotpwdComponent,
    private snackBar: MatSnackBar,
  ) { }

 
  ngOnInit(): void {
    this.LoginOtpForm = this.fb.group(
      {
        one: ['', Validators.required],
        two: ['', Validators.required],
        three: ['', Validators.required],
        four: ['', Validators.required],
      }
    );
    console.log(this.data);
  }
  closeTab(){
    this.dialogRef.close(false);
  }

  SaveForm() {
    let payLoad = { ...this.LoginOtpForm.value };
    let Otp = payLoad.one + payLoad.two + payLoad.three + payLoad.four;
    let userId = this.data;
    console.log(userId);
    console.log(Otp);
    let payLoad1 = {
      userID: this.data.userID,
      Otp: parseInt(Otp)
    }
    console.log(payLoad1);
    this.loginservice.otpVerify(payLoad1).subscribe((res) => {
      console.log(res);
      if (res.response === 3) 
      {
        let dailogRef2 = this.dialog.open(ResetpwdComponent, {
          panelClass: "col-md-6",
          width: '500px',
          height: '500px',
          data :   payLoad1   
        });
        dailogRef2.afterClosed().subscribe((res) => {
          if (res) {        
          this.openSnackBar(res.message, "");
          this.dialogRef.close(true);          
          }else{
            this.dialogRef.close(false);  
          }
        });
      }      
      else {
        this.openSnackBar(res.message, "");
        this.dialogRef.close(false);
      }      
    })
    }

  openOTPdialog() {
    console.log("OTPcomponent");

  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: "red-snackbar",
      verticalPosition: "top",
    });
  }
  ResendLoginOTP()
  {
    let payLoad1 = {
      userID: this.data.userID
    }
    this.loginservice.resendotp(payLoad1).subscribe((res) => {
      console.log(res);
      if (res.response === 3) 
      {
        this.openSnackBar(res.message, "");
      }
      else {
        this.openSnackBar(res.message, "");
      }      
    })
  }

}
