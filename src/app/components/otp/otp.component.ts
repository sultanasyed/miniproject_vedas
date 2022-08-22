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



@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  OtpForm: FormGroup = new FormGroup({});
  user: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  
  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<SignoutComponent>,
    private fb: FormBuilder,
    private router: Router,
    private loginservice: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: SignoutComponent,
    private snackBar: MatSnackBar,
  ) { }
  onOtpChange(event: any) {

  }
  onSubmit() {

  }
  onCancel() { }
  resendotp() { }

  ngOnInit(): void {
    this.OtpForm = this.fb.group(
      {
        one: ['', Validators.required],
        two: ['', Validators.required],
        three: ['', Validators.required],
        four: ['', Validators.required],
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: "red-snackbar",
    });
  }

  SaveForm() {
    let payLoad = { ...this.OtpForm.value };
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
        let userInfo = res.adminInfo;
        delete userInfo.Employee;
        console.log(JSON.stringify(res.adminInfo));
        this.dialogRef.close(JSON.stringify(userInfo));
        this.openSnackBar(res.message, "");
      }
      else {
        this.dialogRef.close(false);
      }      
    })
    }

  openOTPdialog() {
    console.log("OTPcomponent");

  }
  ResendOTP()
  {
    let payLoad2 =
     { userID: this.data.userID}
    this.loginservice.resendotp(payLoad2).subscribe((res) => {
    console.log(res);
    if (res.response === 3) 
    {
      // this.openSnackBar("enter all required fields", "");
    }
      
  })
    
  }


  Send() {
    console.log(this.OtpForm.value);
    console.log("Got OTP");
    this.router.navigateByUrl('/profile');
  }
  closeTab(){
    this.dialogRef.close(false);
  }


}



