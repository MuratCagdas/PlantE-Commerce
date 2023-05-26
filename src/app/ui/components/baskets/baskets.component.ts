import { Component, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';
import { BasketDbConnectService } from 'src/app/services/basket/basket.db.connect.service';
import { OrdersDbConnectService } from 'src/app/services/orders/orders.db.connect.service';
import { IList_Basket_Item } from 'src/app/ts/basket';
import { IOrder, IOrder_Item } from 'src/app/ts/order';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent implements OnInit {

  constructor (
    private basketservice: BasketDbConnectService,
    private ordersconnect: OrdersDbConnectService,
    private alertify: AlertifyService
  ) { }
  usermail: string = localStorage.getItem('mail');
  TotalPeace$ = new BehaviorSubject<number>(0);
  UserBasketList$ = new BehaviorSubject<IList_Basket_Item[]>([]);
  TotalCost$ = new BehaviorSubject<number>(0);

  ngOnInit(): void {
    this.basketservice.GetUserAllBasketItem(this.usermail,this.UserBasketList$).then(()=>{
    this.TotalCost();
    this.totalPeace();
    })
  }
  changePeace(id: number, peace: number) {
    this.basketservice.UpdateBasketItemPeace(id, peace).subscribe();
    this.TotalCost();
    this.totalPeace();
  }
  TotalCost() {
    let cost: number = 0;
    for (let index = 0; index < this.UserBasketList$.value.length; index++) {
      cost += this.UserBasketList$.value[index].peace * this.UserBasketList$.value[index].price;
    }
    return this.TotalCost$.next(cost);
  }
  totalPeace() {
    let peace: number = 0;
    for (let index = 0; index < this.UserBasketList$.value.length; index++) {
      peace += this.UserBasketList$.value[index].peace;
    }
    return this.TotalPeace$.next(peace);
  }
  AddOrders() {
    const basketData: IList_Basket_Item[] = this.UserBasketList$.value;
    const OrderItemList: IOrder_Item[] = [];
    const deletingID: number[] = [];
    basketData.map((item: IList_Basket_Item) => {
      const Order: IOrder_Item = {
        name: item.name,
        peace: item.peace,
        price: item.price,
        type: item.type
      };
      OrderItemList.push(Order);
      deletingID.push(item.id);
    });
    if (OrderItemList.length != 0) {
      const OrderItem: IOrder = {
        mail: this.usermail,
        sellproduct: OrderItemList
      };
      this.ordersconnect.AddUserOrder(OrderItem).subscribe(data => {
        this.alertify.message('Success Order', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
        if (data) {
          for (let index = 0; index < deletingID.length; index++) {
            this.basketservice.DeleteUserAllBasketItem(deletingID[index]).subscribe();
          }
          this.UserBasketList$.next([]);
          this.TotalCost$.next(0);
        }
      });
    } else
      this.alertify.message('Please Add Product', { messageType: MessageType.Warning, position: Position.TopCenter, delay: 2 });
  }
}
