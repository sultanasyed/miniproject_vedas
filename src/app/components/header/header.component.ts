import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { FormControlName } from "@angular/forms";
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ConfirmedValidator } from '../../confirmed.validators'

import { OtpComponent } from '../otp/otp.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from '../profile/profile.component';
import { LogoutComponent } from '../logout/logout.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  user: any;
  isLogedin: boolean =false;
  obj: any;
  userId: any;
  baseurl: string = "";
  user1: any;

  constructor(
    private loginservie: LoginService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.loginservie.isLogedUser.subscribe((val) => {
      if (val === true) {
        this.isLogedin = true;
      } else {
        this.isLogedin = false;
      }
    })
  }
  
  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    console.log(JSON.parse(this.user));
    if (this.user) {
      this.user1 = JSON.parse(this.user);
      this.baseurl = this.loginservie.baseUrl;
      this.baseurl += this.user1.profilepic;
    }
  }

  Logout() {
    this.router.navigateByUrl('/logout');

  }
  EmpDetails() {
    if(this.isLogedin){
      this.router.navigateByUrl('/empdetails');
    }else{
      this.router.navigateByUrl('/login');
    }
  }



}
