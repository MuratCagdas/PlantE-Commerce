import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder, IOrder_Item, IOrder_List } from 'src/app/ts/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersDbConnectService {

  constructor (
    private http: HttpClient
  ) { }
  private ordersurl: string = 'http://localhost:3004/orders';
  AddUserOrder(order: IOrder) {
    return this.http.post<IOrder>(this.ordersurl, order);
  }
  GetUsersOrders() {
    return this.http.get<IOrder_List[]>(this.ordersurl);
  }
  DeleteUserOrder(mail: string, id: number) {
    return this.http.delete<IOrder_Item>(this.ordersurl + "?mail=" + mail + "&" + "id=" + id);
  }
}
