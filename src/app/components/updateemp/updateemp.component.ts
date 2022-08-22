import { Component, OnInit, ResolvedReflectiveFactory,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControlName } from "@angular/forms";
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ConfirmedValidator } from '../../confirmed.validators'
import { LoginService } from "../../services/login.service";
import { EmpdtComponent } from '../empdt/empdt.component'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-updateemp',
  templateUrl: './updateemp.component.html',
  styleUrls: ['./updateemp.component.css']
})
export class UpdateempComponent implements OnInit {
  EmpUpdate: FormGroup | any;
  gender = null;
  isTable: boolean = true;
  user : any;
  user1: any;
  entries: any;
  htt: any;
  hide = true;
  EmpInfo : Array<any> =[];
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  eid : string = "_vedas";
  url: any;
  submitted : any;
  loading : any;
  path : any;
  upload : any;
  data : any;
  Form1 : boolean = false;
  datafile : any;
  updatEmpInfo :any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
   horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  constructor( private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private router: Router,
    private datetime: MatDatepickerModule,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,    
    private dialogRef: MatDialogRef<EmpdtComponent>,
    @Inject(MAT_DIALOG_DATA) public data3: EmpdtComponent) { }

  ngOnInit(): void {
    this.EmpUpdate = this.formBuilder.group(
      {
        Email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
        doj: new FormControl('', [Validators.required,]),
        gender: new FormControl('', [Validators.required,]),
        address: new FormControl('', [Validators.required,]),
        file: new FormControl('', [Validators.required,]),
      },
    );
    this.user = localStorage.getItem("user");
    console.log("employee user");
    console.log(this.data3);
    this.user1 = JSON.parse(this.user);
    let payLoad = {
      userID: this.user1.userID
    }
    this.updatEmpInfo = this.data3; 
    this.BindData(this.updatEmpInfo);
    console.log(this.eid + new Date().getTime());
    this.loginservice.findInfo(payLoad).subscribe((res) => {
      console.log(res);
      if (res.response === 3) {
        let usrInfo = res.Info;
        this.EmpInfo = usrInfo.Employee;
      }
    })
  }
  BindData(dataInfo: any){
    console.log("Data Information...");
    console.log(dataInfo);
    this.EmpUpdate.patchValue({
      Email : dataInfo.EmailId,
      doj : dataInfo.dateofjoin,
      gender : dataInfo.gender,
      address : dataInfo.address,
      file : dataInfo.resume.substring(dataInfo.resume.lastIndexOf('/')+1)
      
    })
  }
  get f() {
    return this.EmpUpdate.controls;
  }
  closeTab (){
    this.dialogRef.close(false);
  }
  Update(){
    let payLoad = { ...this.EmpUpdate.value };
    delete payLoad.file;
    delete payLoad.EmpID;
    // payLoad.EmpID = empid;
    let updatepayload = {
      userID: this.user1.userID,
      EmpID: this.updatEmpInfo.Empid,
      EmpgmailID: payLoad.Email,
      DateofJoining: payLoad.doj,
      Gender: payLoad.gender,
      address: payLoad.address,
    
    }
    let formdata = new FormData();
    formdata.append("resume", this.EmpUpdate.get("file").value);
    formdata.append("passInfo", JSON.stringify(updatepayload));
    console.log(updatepayload);
    this.loginservice.update(formdata).subscribe(
      (result) => {
        console.log(result);
        if (result.response == 3) {
          console.log(result);
          this.openSnackBar(result.message, "");
          this.dialogRef.close(true);
        }
        else {
          this.openSnackBar(result.message, "");
          this.dialogRef.close(false);
        }
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.error instanceof Error) {
          this.openSnackBar(err.message, "");
        } else {
          this.openSnackBar(err.message, "");
        }
      })
  }

  source(){    
    var mimeType = this.datafile.type;
    if (mimeType.match(/file\/*/) == null) {
      return;
  }
  let reader = new FileReader();
    reader.readAsDataURL(this.datafile);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
}
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: "red-snackbar",
      verticalPosition: "top",
    });
  }
 
  onselectFile(event: any) {
    this.datafile = <File>event.target.files[0];
    this.EmpUpdate.get("file").setValue(this.datafile);
    this.source();
  
  }

}
