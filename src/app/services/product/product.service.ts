import { Injectable } from '@angular/core';
import { ProductDbConnectService } from './product.db.connect.service';
import { _isAuthenticated } from '../identity/identity.service';
import { IList_Product } from 'src/app/ts/product';
import { BehaviorSubject } from 'rxjs';
import { LikeDbConnectService } from '../like/like.db.connect.service';
import { ILike_Item, ILike_List } from 'src/app/ts/like';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor (
    private productservice: ProductDbConnectService,
    private likedbconnect: LikeDbConnectService,
  ) { }
  // admin's adding product list
  private productlist$ = new BehaviorSubject<IList_Product[]>([]);
  //Show product
  async AuthUserGetProduct_PublicProduct(productType: string, List$: BehaviorSubject<any[]>) {
    try {
      await this.productservice.GetTypeProduct(productType, this.productlist$);
    } catch (error) {
      console.log(error);
    }
    // check db null 
    if (this.productlist$.value.length != 0) {
      // check authentication 
      if (_isAuthenticated) {
        // new product List (Public product & auth Like product)
        let NewProductArray: ILike_Item[] = [];
        // check Like in db
        let _userLikeInList: Boolean = false;
        // get Like product in db
        this.likedbconnect.GetUserLike().subscribe((data: ILike_List[]) => {
          // data null check
          if (data != null) {
            // User Like db all knowledge List
            let getLikeList$ = new BehaviorSubject<ILike_List[]>([]);
            // Like user product List
            let LikeproductList$ = new BehaviorSubject<ILike_Item[]>([]);
            getLikeList$.next(data);
            getLikeList$.value.map((x: ILike_List) => {
              LikeproductList$.next(x.likeproduct);
            });
            // comparing Like user product & admin's added product
            for (let index = 0; index < this.productlist$.value.length; index++) {
              LikeproductList$.value.map((item: ILike_Item) => {
                if ((this.productlist$.value[index].name === item.name) && (JSON.stringify(NewProductArray).indexOf(this.productlist$.value[index].name) < 0)) {
                  let NewProduct: ILike_Item = {
                    information: this.productlist$.value[index].information,
                    name: this.productlist$.value[index].name,
                    color: item.color,
                    price: this.productlist$.value[index].price,
                    type: this.productlist$.value[index].type,
                    url: this.productlist$.value[index].url
                  };
                  NewProductArray.push(NewProduct);
                }
              });
              if ((JSON.stringify(NewProductArray).indexOf(this.productlist$.value[index].name) < 0)) {
                let NewProduct2: ILike_Item = {
                  information: this.productlist$.value[index].information,
                  name: this.productlist$.value[index].name,
                  color: "black",
                  price: this.productlist$.value[index].price,
                  type: this.productlist$.value[index].type,
                  url: this.productlist$.value[index].url
                };
                NewProductArray.push(NewProduct2);
              }
            }
            // adding new list for products (List$ = sending List in this method )
            List$.next(NewProductArray);
          } else { _userLikeInList = true; }
        });
        // authentication is ok but Like product is null
        if (_userLikeInList = true) {
          this.ProductListWithoutLike(this.productlist$.value, List$);
        }
      }
      //no authentication 
      else {
        this.ProductListWithoutLike(this.productlist$.value, List$);
      }
    } 
  }
  //showing product with none authentication 
  ProductListWithoutLike(productList: IList_Product[], ProductList$: BehaviorSubject<any>) {
    let newProductList: ILike_Item[] = [];
    productList.forEach((item: IList_Product) => {
      let NewProduct: ILike_Item = {
        color: "black",
        information: item.information,
        name: item.name,
        price: item.price,
        type: item.type,
        url: item.url
      };
      newProductList.push(NewProduct);
    });
    ProductList$.next(newProductList);
  }
}
