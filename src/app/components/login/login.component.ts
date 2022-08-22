
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ForgotpwdComponent } from '../forgotpwd/forgotpwd.component';
import { LoginService } from "../../services/login.service";
import { OtpComponent } from '../otp/otp.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Form Validables 
  registerForm: FormGroup | any;
  submitted = false;
  userID: any;
  loading = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginservice: LoginService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40)
      ]
      ],
    });


  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: "red-snackbar",
      verticalPosition: "top",
    });
  }

  //Add user form actions
  get f() { return this.registerForm.controls; }

  OpenForgotPwd() {
    console.log("Forgotpwd component");
    let fpwd = this.dialog.open(ForgotpwdComponent, {
      panelClass: "col-md-4",
      hasBackdrop: true,
      disableClose: true,
    })
    fpwd.afterClosed().subscribe((res) => {
      if(res == true){
        this.router.navigateByUrl('/login');
      }else{
        this.router.navigateByUrl('/homepage');
      }
    })
  }



  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if (this.submitted) {
      this.loading = true;
      console.log("login successfull");
      console.log(this.registerForm.value);
      let payLoad = { ...this.registerForm.value };
      let payLoad1 = {
        userID: payLoad.email,
        Password: payLoad.password
      }
      this.loginservice.login(payLoad1).subscribe(
        (result) => {
          console.log(result);
          if (result.response == 3) {
            this.openSnackBar(result.message, "");
            console.log(result.stuinfo);
            if (result.stuinfo.verification_status) {
              this.loginservice.isLogedUser.next(true);
              let userInfo =  result.stuinfo;
              delete userInfo.Employee;
              console.log("User Info");
              console.log(userInfo);
              localStorage.setItem("user",JSON.stringify(userInfo));
              localStorage.setItem("token", result.token);
              this.loginservice.isLogedUser.next(true);
              this.router.navigateByUrl('/profile');
            } else {
              let dialogRef = this.dialog.open(OtpComponent, {
                height: '300px',
                width: '400px',
                data: payLoad1
              })
              dialogRef.afterClosed().subscribe((res) => {
                if (res) {
                  this.loginservice.isLogedUser.next(true);
                  localStorage.setItem("user", res);
                  this.router.navigateByUrl('/profile');
                } else {
                  this.router.navigateByUrl('/homepage');
                }
              })
            }

          } else {
            console.log(result);
            this.openSnackBar(result.message, "");
          }
        }, (err: HttpErrorResponse) => {
          this.loading = false;
          console.log("Set Profile", err);
          if (err.error instanceof Error) {
            this.openSnackBar(err.message, "Client Error");
          } else {
            this.openSnackBar(err.message, "Server Error");
          }
        }
      )
    }
    else {
      console.log("login failed");

    }
  }


}

