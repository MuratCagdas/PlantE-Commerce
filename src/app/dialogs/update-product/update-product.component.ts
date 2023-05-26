import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { ProductDbConnectService } from 'src/app/services/product/product.db.connect.service';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IList_Product, IProductType } from 'src/app/ts/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  dialogForm: FormGroup;
  typeProduct: IProductType[] = [{ name: "indoor" }, { name: "outdoor" }, { name: "gifts" }, { name: "pots" }];

  constructor (
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IList_Product,
    public fb: FormBuilder,
    private product: ProductDbConnectService,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.dialogForm = this.fb.group({
      name: [this.data.name, [
        Validators.required
      ]],
      type: [this.data.type, [
        Validators.required
      ]],
      price: [this.data.price, [
        Validators.required
      ]],
      information: [this.data.information, [
        Validators.required
      ]],
      url: [this.data.url, [
        Validators.required
      ]]
    });
  }
  Submit(formdata: any) {
    if (this.dialogForm.valid) {
      this.product.UpdateProductItemPeace(this.data.id, formdata).pipe(catchError((err: HttpErrorResponse) => {
        return throwError(() => {
          this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
        });
      })).subscribe(x => {
        this.alertify.message('Success Update Product', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
        this.dialogRef.close();
      });
    }
    else return this.alertify.message('Please fill the all blank', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
