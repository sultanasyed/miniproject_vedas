import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginOTPComponent } from '../login-otp/login-otp.component';
import { ConfirmedValidator } from '../../confirmed.validators'
import { LoginService } from "../../services/login.service";
@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent implements OnInit {
  form1 = new FormGroup({
    password: new FormControl(),
    cnfpassword: new FormControl()
  });
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  dataUser : any;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginOTPComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginOTPComponent,
    private loginservice :LoginService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.dataUser = this.data;
    this.form1 = this.fb.group({
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
          Validators.minLength(8),
        ],
      ],
      cnfpassword: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
          Validators.minLength(8),
        ],
      ],
    },
      {
        validators: ConfirmedValidator('password', 'cnfpassword')
      },
    );
  }
  get f() {
    return this.form1.controls;
  }

  onSubmit() {
    if (this.form1.valid) {
      console.log('Form Submitted');
      console.log(this.form1.value);

      let payLoad = { ...this.form1.value };
      delete payLoad.cnfpassword;
      let resetpayload = {
        userID : this.dataUser.userID,
        Password: payLoad.password
      }

    console.log(resetpayload);
     this.loginservice.resetpassword(resetpayload).subscribe((resInfo)=>{
      if(resInfo.response == 3){
        this.dialogRef.close(true);
      }else{
        this.dialogRef.close(false);
      }
     })
    } else {
      this.openSnackBar('Form values are invalid.', "");
    }
  }
  closeTab() {
    this.dialogRef.close(false);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: "red-snackbar",
      verticalPosition: "top",
    });
  }


}
