import { Injectable } from '@angular/core';
import { _isAuthenticated } from '../identity/identity.service';
import { Router } from '@angular/router';
import { BasketDbConnectService } from './basket.db.connect.service';
import { AlertifyService, MessageType, Position } from '../alertify/alertify.service';
import { IBasketItem, IList_Basket_Item } from 'src/app/ts/basket';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UpdatebasketService {

  constructor (
    private alertify: AlertifyService,
    private basketservice: BasketDbConnectService,
    private route: Router
  ) { }
  public get isBasketItem(): boolean {
    return _isBasketItem;
  }
  AddBasket(Product: any, dataType: string, name: string) {
    
  const usermail: any = localStorage.getItem('mail');
    if (_isAuthenticated) {
      let basketproductId: any;
      let basketproductPeace: any;
      this.basketservice.ControlUserBasketItem(usermail, dataType, name).subscribe((data: IList_Basket_Item[]) => {
        data.length === 0 ? _isBasketItem = true : _isBasketItem = false;
        data.map((item: IList_Basket_Item) => {
          basketproductId = item.id;
          basketproductPeace = item.peace;
        });
        if (_isBasketItem) {
          const basketITem: IBasketItem = {
            mail: usermail,
            url: Product.url,
            information: Product.information,
            name: Product.name,
            price: Product.price,
            type: Product.type,
            peace: 1
          };
          this.basketservice.AddBasketItem(basketITem).pipe(catchError((err: HttpErrorResponse) => {
            return throwError(() => {
              this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.BottomCenter, delay: 2 });
            });
          })).subscribe(data => {
            this.alertify.message('Success Added Product in Basket', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
          });
        }
        else {
          this.basketservice.UpdateBasketItemPeace(basketproductId, basketproductPeace + 1).subscribe();
          this.alertify.message('Success Updated Product in Basket', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
        }
      });
    }
    else {
      this.alertify.message('Please Login', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
      this.route.navigate(["/login"]);
    }
  }
}
export let _isBasketItem: boolean = false;
