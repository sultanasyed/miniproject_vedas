import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
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
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {
  SignoutForm: FormGroup | any;
  hide = true;
  userID: any;
  

  get f() {
    return this.SignoutForm.controls;
  }
  constructor(private formBuilder: FormBuilder, private router: Router, private loginservice: LoginService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.SignoutForm = this.formBuilder.group(
      {
        image: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
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
  Submit() {
    console.log(this.SignoutForm.value);
  }

  url: any;
  msg = "";
  onselectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    let file = event.target.files[0];
    this.SignoutForm.get("image").setValue(file);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
  }
  SaveForm() {
    let payLoad = { ...this.SignoutForm.value };
    delete payLoad.image;
    delete payLoad.confirm_password;
    let registerPayload = {
      userID: payLoad.email,
      Password: payLoad.password,
      rigister_type: "Manual"
    }
    console.log(registerPayload);
    let formdata = new FormData;
    formdata.append("image", this.SignoutForm.get("image").value);
    formdata.append("passInfo", JSON.stringify(registerPayload));
    console.log(formdata);

    this.loginservice.register(formdata).subscribe((res) => {
      console.log(res);
      if (res.response === 3) 
      {
        let dailogRef2 = this.dialog.open(OtpComponent, {
          panelClass: "col-md-6",
          width: '450px',
          height: '300px',            
          data: registerPayload
        });
        dailogRef2.afterClosed().subscribe((res) => {
          if (res) {
            console.log(res);
            localStorage.setItem("userID", res);
            this.loginservice.isLogedUser.next(true);
            localStorage.clear();
            this.router.navigateByUrl('/profile');
          }else{
            this.router.navigateByUrl('/homepage');
          }
        });
      }
      else {
        this.router.navigateByUrl('/homepage');
      }
      
    })
  
  }


}
