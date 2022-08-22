import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, } from '@angular/forms';
import { LoginService } from "../../services/login.service";
import { FormControlName } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateempComponent } from '../updateemp/updateemp.component';
import { DeleteempComponent } from '../deleteemp/deleteemp.component';

@Component({
  selector: 'app-empdt',
  templateUrl: './empdt.component.html',
  styleUrls: ['./empdt.component.css']
})
export class EmpdtComponent implements OnInit {
  EmpForm: FormGroup | any;
  gender = null;
  isTable: boolean = true;
  user: any;
  user1: any;
  entries: any;
  htt: any;
  hide = true;
  EmpInfo: Array<any> = [];
  splitEmpInfo : Array<any> =[];
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  eid: string = "_vedas";
  url: any;
  submitted: any;
  loading: any;
  path: any;
  upload: any;
  data: any;
  Form1: boolean = false;
  datafile: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  states = [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"]

  get f() {
    return this.EmpForm.controls;
  }

  templateForm(value: any) {
    alert(JSON.stringify(value));
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private router: Router,
    private datetime: MatDatepickerModule,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.EmpForm = this.formBuilder.group(
      {
        Email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
        doj: new FormControl('', [Validators.required,]),
        gender: new FormControl('', [Validators.required,]),
        address: new FormControl('', [Validators.required,]),
        file: new FormControl('', [Validators.required,]),
      },
    );
    this.EmpForm.patchValue({
      address : null
    })
    this.user = localStorage.getItem("user");
    console.log("employee user");
    console.log(this.user);
    this.user1 = JSON.parse(this.user);
    let payLoad = {
      userID: this.user1.userID
    }
    console.log(this.eid + new Date().getTime());
    this.loginservice.findInfo(payLoad).subscribe((res) => {
      console.log(res);
      if (res.response === 3) {
        let usrInfo = res.Info;
        this.EmpInfo = usrInfo.Employee;
        this.splitEmpInfo =this.splitArr(this.EmpInfo,3);
      console.log("split emp info");
      console.log(this.splitEmpInfo);
      }
    })

  }

  source() {
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
    this.EmpForm.get("file").setValue(this.datafile);
    this.source();

  }
  SaveForm() {
    this.submitted = true;
    this.loading = true;
    console.log("save form started ...");
    console.log(this.EmpForm.value);
    let payLoad = { ...this.EmpForm.value };
    delete payLoad.file;
    let empid = this.eid + new Date().getTime();
    delete payLoad.EmpID;
    payLoad.EmpID = empid;
    let epayload = {
      userID: this.user1.userID,
      EmpID: empid,
      EmpgmailID: payLoad.Email,
      DateofJoining: payLoad.doj,
      Gender: payLoad.gender,
      address: payLoad.address
    }
    let formdata = new FormData();
    formdata.append("resume", this.EmpForm.get("file").value);
    formdata.append("passInfo", JSON.stringify(epayload));
    console.log(epayload);
    this.loginservice.insert(formdata).subscribe(
      (result) => {
        console.log(result);
        if (result.response == 3) {
          console.log("Result data....");
          console.log(result);
          console.log(this.user1.userID);
          this.fetchData(this.user1.userID);
          this.openSnackBar(result.message, "");
        }
        else {
          this.openSnackBar(result.message, "");
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

  startDate = new Date(2000, 0, 2);
  selectOption(flag: boolean) {
    this.isTable = flag;
  }

  changeTable(flag: boolean) {
    this.isTable = flag;
  }

  Updt(i: any) {
    var dataLoad = i;
    dataLoad.userID = this.user1.userID;

    const dialogRef = this.dialog.open(UpdateempComponent, {
      height: '400px',
      width: '500px',
      data: dataLoad
    })
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        let payLoad = {
          userID: this.user1.userID
        }
        this.fetchData(payLoad);
      }
    })
  }
  Del(i: any) {
    var dataLoad = i;
    dataLoad.userID = this.user1.userID;
    const dialogRef = this.dialog.open(DeleteempComponent, {
      height: '300px',
      width: '450px',
      data: dataLoad
    })
    dialogRef.afterClosed().subscribe((val) => {
      if (val == true) {
        this.loginservice.isLogedUser.next(true);
        let payLoad = {
          userID: this.user1.userID
        }
        this.fetchData(payLoad);
      } else {

      }
    })
  }
  fetchData(userID: any) {
    console.log("user ID");
    console.log(userID);
    let pload = {
      userID: userID
    }
    this.loginservice.findInfo(pload).subscribe((result) => {
      console.log(result);
      this.EmpInfo = result.Info.Employee;
      this.splitEmpInfo =this.splitArr(this.EmpInfo,3);
      console.log("split emp info");
      console.log(this.splitEmpInfo);
    })
  }

  splitArr(arr: string | any[], size: number) {
    let newArr = [];
    for(let i = 0; i< arr.length; i += size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
 }


}
