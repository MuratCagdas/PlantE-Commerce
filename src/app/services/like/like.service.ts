import { Injectable } from '@angular/core';
import { ILike, ILike_Item} from 'src/app/ts/like';
import { LikeDbConnectService } from './like.db.connect.service';
import { AlertifyService, MessageType, Position } from '../alertify/alertify.service';
import { Router } from '@angular/router';
import { _isAuthenticated } from '../identity/identity.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor (
    private alertify: AlertifyService,
    private likedbconnect: LikeDbConnectService,
    private route: Router
  ) { }
  // adding or removing like in db
  async AddOrRemoveUserLike(product: ILike_Item, color: any) {
    
  //mail control
  const usermail: any = localStorage.getItem('mail');
    // user like db list
    let getUserLikeData$ = new BehaviorSubject<ILike_Item[]>([]);
    // user id
    let userLikeID$ = new BehaviorSubject<number>(0);
    //check authentication 
    if (_isAuthenticated) {
      //get userlike data in db 
      try {
      await this.likedbconnect.GetUserLikeList(userLikeID$, getUserLikeData$)
      } catch (error) {
        console.log(error)
      }
      //check color
       if (color === "black" ) {
        //if user haven't data in database, create new user like data
        if (getUserLikeData$.value.length == 0) {
          const userLikeProduct: ILike_Item[] = [];
          let userLikeItem: ILike_Item = {
            information: product.information,
            name: product.name,
            price: product.price,
            type: product.type,
            color: "red",
            url: product.url
          };
          userLikeProduct.push(userLikeItem);
          let userLike: ILike = {
            likeproduct: userLikeProduct,
            mail: usermail
          };
          this.likedbconnect.AddUserLike(userLike).subscribe();
        } else if (getUserLikeData$.value.length != 0) {
          // if user have data in database, update user like data
          let likeProduct: ILike_Item[] = getUserLikeData$.value;
          let newUserLikeItem: ILike_Item = {
            information: product.information,
            name: product.name,
            price: product.price,
            type: product.type,
            color: "red",
            url: product.url
          };
          likeProduct.push(newUserLikeItem);
          this.likedbconnect.UpdateUserLikeItem(userLikeID$.value, likeProduct).subscribe();
        }
      } else if (color === "red") {
        //if user have one data in like, delete user in database
        if (getUserLikeData$.value.length === 1) {
          this.likedbconnect.RemoveUserLike(userLikeID$.value);
        } else if (getUserLikeData$.value.length > 1) {
          //if user have at least two data,update user like data 
          let newLikeProduct: ILike_Item[];
          getUserLikeData$.value.forEach((x: ILike_Item, index) => {
            if (x.name === product.name) {
              getUserLikeData$.value.splice(index, 1);
              newLikeProduct = getUserLikeData$.value;
            }
          });
          this.likedbconnect.UpdateUserLikeItem(userLikeID$.value, newLikeProduct).subscribe();
        }
      }
    }
    //no authentication   
    else {
      this.alertify.message('Please Login', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
      this.route.navigate(["/login"]);
    }
  }
}
