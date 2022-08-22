import { Component, OnInit, ResolvedReflectiveFactory,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";

import { FormControlName } from "@angular/forms";
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginService } from "../../services/login.service";
import { EmpdtComponent } from '../empdt/empdt.component'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-deleteemp',
  templateUrl: './deleteemp.component.html',
  styleUrls: ['./deleteemp.component.css']
})
export class DeleteempComponent implements OnInit {
  retrieveData : any;
  id : any;
  idx: any;

  constructor( private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private router: Router,    
    private snackBar: MatSnackBar,
    private dialog: MatDialog,    
    private dialogRef: MatDialogRef<EmpdtComponent>,
    @Inject(MAT_DIALOG_DATA) public data3: EmpdtComponent) { }

  ngOnInit(): void {
    this.retrieveData = this.data3;
  }
  closeTab()
  {
      this.dialogRef.close(false);
  }
  Deleted(){
    let paylod = {
      userID : this.retrieveData.userID,
      ID : this.retrieveData.Empid
    }
    this.loginservice.DeleteSpecificID(paylod).subscribe((res)=>{
      if(res.response == 3){
        this.openSnackBar(res.message,"");
        this.dialogRef.close(true);
      }else{
        this.openSnackBar(res.message,"");
        this.dialogRef.close(false);
      }
    })
  }
  Cancel(){
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
