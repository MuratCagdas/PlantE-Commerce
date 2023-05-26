import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBasketItem, IList_Basket_Item } from 'src/app/ts/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketDbConnectService {

  constructor (
    private http: HttpClient
  ) { }

  private basketurl: string = 'http://localhost:3004/baskets';

  AddBasketItem(basketProduct: IBasketItem) {
    return this.http.post<IBasketItem>(this.basketurl, basketProduct);
  }
  async GetUserAllBasketItem(mail: string,list$:BehaviorSubject<any>) {
    // return this.http.get<IList_Basket_Item[]>(this.basketurl + "?mail=" + mail);
    const promise = new Promise<IList_Basket_Item[] | void>((resolve, reject) => {
      this.http.get<IList_Basket_Item[]>(this.basketurl + "?mail=" + mail).subscribe({
        next: ((res: IList_Basket_Item[]) => {
          list$.next(res);
          resolve();
        }),
        error: ((err: HttpErrorResponse) => {
          reject(err);
        })
      });
    });
    return await promise;
  }
  ControlUserBasketItem(mail: string, type: string, name: string) {
    return this.http.get<IList_Basket_Item[]>(this.basketurl + "?mail=" + mail + "&" + "type=" + type + "&" + "name=" + name);
  }
  DeleteUserAllBasketItem(id: number) {
    return this.http.delete<IBasketItem>(this.basketurl + "/" + id);
  }
  UpdateBasketItemPeace(id: number, Newpeace: number) {
    return this.http.patch<IBasketItem>(this.basketurl + "/" + id, { peace: Newpeace });
  }
}
