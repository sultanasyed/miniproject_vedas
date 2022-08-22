import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from "../../services/login.service";
import { LoginComponent } from "../login/login.component";
import { LoginOTPComponent } from '../login-otp/login-otp.component';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit {

  RequestResetForm: FormGroup | any;
  userID: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  showOtpScreen: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted :boolean =false;
  constructor(
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.RequestResetForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });

  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: "red-snackbar",
    });
  }

 get officialEmail(){
  return this.RequestResetForm.get('Email');
 }
 onSubmit(){
  this.submitted =true;
  let payLoad = { ...this.RequestResetForm.value };
  let registerPayload = {
    userID: payLoad.Email,
  }
  console.log(registerPayload);
  this.loginservice.forgtpassword(registerPayload).subscribe((res) => {
    console.log(res);
    if (res.response === 3) {
      let dailogRef2 = this.dialog.open(LoginOTPComponent, {
        panelClass: "col-md-6",
        width: '450px',
        height: '300px',
        data: registerPayload
      });
      dailogRef2.afterClosed().subscribe((res)=>{
        if(res == true){
          this.dialogRef.close(true);
        }else {
          this.dialogRef.close(false);
        }
      })
    }
    else {
      this.openSnackBar(res.message, "");
    }
  })
 }


  closeTab() {
    this.dialogRef.close(false);
  }

}
