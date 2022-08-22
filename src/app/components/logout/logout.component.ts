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
import { HeaderComponent } from '../header/header.component';
import { } from '../../services/login.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private loginservice:LoginService,
    private router:Router) { }

  ngOnInit(): void {
  }

  submit(){
    this.loginservice.isLogedUser.next(false);

    this.router.navigateByUrl('/homepage');
  }
  close(){
    this.router.navigateByUrl('/homepage');
  }

}
