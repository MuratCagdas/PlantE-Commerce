import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrdersDbConnectService } from 'src/app/services/orders/orders.db.connect.service';
import { IOrder_Item, IOrder_List } from 'src/app/ts/order';

export interface IOrder_Item_ID {
  id: number,
  name: string,
  type: string,
  price: number,
  peace: number;
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor (
    private ordersconnect: OrdersDbConnectService
  ) { }
  OrdersList$ = new BehaviorSubject<IOrder_List[]>([]);
  OrderProductList$ = new BehaviorSubject<IOrder_Item_ID[]>([]);

  ngOnInit(): void {
    this.ordersconnect.GetUsersOrders().subscribe((data: IOrder_List[]) => {
      const orderlist: IOrder_Item_ID[] = [];
      data.map((item) => {
        item.sellproduct.map((order: IOrder_Item) => {
          const userorder: IOrder_Item_ID = {
            id: item.id,
            name: order.name,
            peace: order.peace,
            price: order.price,
            type: order.type
          };
          orderlist.push(userorder);
        });
      });
      this.OrdersList$.next(data);
      this.OrderProductList$.next(orderlist);
      console.log(orderlist);
    });

  }
}
