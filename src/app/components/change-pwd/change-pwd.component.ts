import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";
import { FormControlName } from "@angular/forms";
import { FormGroup,Validators, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {ConfirmedValidator} from 'src/app/confirmed.validators';
import { LoginService } from "../../services/login.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { HeaderComponent } from '../header/header.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit 
{
  ChangePwdForm: FormGroup | any;
  hide = true;
  userID: any;
  dataUser : any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private loginservice: LoginService,
    private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
      this.ChangePwdForm = this.formBuilder.group(
        {         
          currentpassword: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
          ],
          password: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
          ],
          confirm_password: ['', Validators.required],
  
        },
        {
          validators: ConfirmedValidator('password', 'confirm_password')
        },
  
      );
   }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000,
        panelClass: "red-snackbar",
      });
    }
 
  UpdateForm()
  {
      if (this.ChangePwdForm.valid) {
      console.log('Form Submitted');
      console.log(this.ChangePwdForm.value);
      this.userID = localStorage.getItem("user");
      this.dataUser = JSON.parse(this.userID);
      console.log(this.dataUser);
  

      let payLoad = { ...this.ChangePwdForm.value };
      delete payLoad.confirm_password;
      let changepayload = {
        userID: this.dataUser.userID,
        oldPassword: payLoad.currentpassword,
        newPassword: payLoad.password
      }

    console.log(changepayload);
     this.loginservice.changepassword(changepayload).subscribe((resInfo)=>{
      if(resInfo.response == 3)
      {
       this.openSnackBar(resInfo.message, "");
       this.router.navigateByUrl('/homepage');
      }
     })
    } else {
      this.openSnackBar('Form values are invalid.', "");
    }

  }
  get f()
  {
    return this.ChangePwdForm.controls;
  }
 
      

     closeTab() {
      this.router.navigateByUrl('/homepage');
    }
    

     

}
