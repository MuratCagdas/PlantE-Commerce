import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AddProductComponent } from 'src/app/dialogs/add-product/add-product.component';
import { UpdateProductComponent } from 'src/app/dialogs/update-product/update-product.component';
import { ProductDbConnectService } from 'src/app/services/product/product.db.connect.service';
import { IList_Product } from 'src/app/ts/product';

export class tableData {
  id: number;
  no: number;
  name: string;
  type: string;
  price: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public isBtnActive: number = 1;
  ProductList$ = new BehaviorSubject<IList_Product[]>([]);

  constructor (
    public dialog: MatDialog,
    private productservice: ProductDbConnectService,
  ) { }

  ngOnInit(): void {

    this.toggleBtn(1, 'indoor');
  }

  toggleBtn(id: number, value: any) {
    this.isBtnActive = id;
    this.productservice.GetTypeProduct(value, this.ProductList$);
  }
  openAddProductDialog() {
    const addDialogRef = this.dialog.open(AddProductComponent, { height: '550px', width: '750px' });
    addDialogRef.afterClosed().subscribe(x => {
      this.toggleBtn(1, 'indoor');
    });
  }
  updateProductDialog(product: IList_Product, productType: string) {
    const dialogref = this.dialog.open(UpdateProductComponent, { data: product, height: '550px', width: '750px' });
    let productID: any;
    switch (productType) {
      case "indoor":
        productID = 1;
        break;
      case "outdoor":
        productID = 2;
        break;
      case "pots":
        productID = 3;
        break;
      case "gifts":
        productID = 4;
        break;
    }
    dialogref.afterClosed().subscribe(x => {
      this.toggleBtn(productID, productType);
    });
  }
}
