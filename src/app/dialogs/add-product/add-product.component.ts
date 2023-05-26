import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';
import { ProductDbConnectService } from 'src/app/services/product/product.db.connect.service';
import { IProductType } from 'src/app/ts/product';

export interface DialogData {
  formData: any;
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  dialogForm: FormGroup;
  typeProduct: IProductType[] = [{ name: "indoor" }, { name: "outdoor" }, { name: "gifts" }, { name: "pots" }];

  constructor (
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder,
    private product: ProductDbConnectService,
    private alertify: AlertifyService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.dialogForm = this.fb.group({
      name: ["", [
        Validators.required
      ]],
      type: ["", [
        Validators.required
      ]],
      price: ["", [
        Validators.required
      ]],
      information: ["", [
        Validators.required
      ]],
      url: ["", [
        Validators.required
      ]]
    });
  }
  Submit(formdata: any) {
    if (this.dialogForm.valid) {
      this.product.SaveData(formdata).pipe(catchError((err: HttpErrorResponse) => {
        return throwError(() => {
          this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
        });
      })).subscribe(x => {
        this.alertify.message('Success Add Product', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
        this.dialogRef.close();
      });
    }
    else return this.alertify.message('Please fill the all blank', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
  }
}