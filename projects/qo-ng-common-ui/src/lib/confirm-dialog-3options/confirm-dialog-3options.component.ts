import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'confirm-dialog-3options-dialog',
    templateUrl: './confirm-dialog-3options.component.html',
    styleUrls: ['./confirm-dialog-3options.component.scss']
  })
export class ConfirmDialog3OptionsComponent implements OnInit {

  
  public title: string;
  public message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog3OptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {

      this.title = this.data.title;
      this.message = this.data.message;

    }

    returnYes() {
        this.dialogRef.close("Yes");
    }

    returnNo() {
        this.dialogRef.close("No");
    }

    close() {
        this.dialogRef.close();
    }
    
  }