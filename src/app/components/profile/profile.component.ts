import { Component, OnInit } from '@angular/core';
import { ResolvedReflectiveFactory } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { FormControlName } from "@angular/forms";
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ConfirmedValidator } from '../../confirmed.validators'
import { LoginService } from "../../services/login.service";
import { OtpComponent } from '../otp/otp.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ProfileDisplay: FormGroup | any;
  user : any;
  user1 : any;
  baseurl: string="";
  profilePic : string ="";
  
  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private loginservice: LoginService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    console.log("Profile Info");
    console.log(this.user);
    if(this.user){
      this.user1 = JSON.parse(this.user);
      this.baseurl = this.loginservice.baseUrl;
      this.profilePic = this.loginservice.baseUrl.concat(this.user1.profilepic);
    }
  }
  fetchData()
  {
    let profile = { ...this.ProfileDisplay.value };   
    let findInfoPayLoad = {
      userID: profile.email,
     
    }
    console.log(findInfoPayLoad);

   
    
  }

  get f() {
    return this.ProfileDisplay.controls;
  }



}
