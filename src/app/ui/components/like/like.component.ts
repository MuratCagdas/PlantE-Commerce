import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
import { UpdatebasketService } from 'src/app/services/basket/updatebasket.service';
import { LikeDbConnectService } from 'src/app/services/like/like.db.connect.service';
import { LikeService } from 'src/app/services/like/like.service';
import { ILike_Item, ILike_List } from 'src/app/ts/like';
import { IList_Product } from 'src/app/ts/product';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  constructor (
    private updatebasketservice: UpdatebasketService,
    private like: LikeService,
    private likedb: LikeDbConnectService
  ) { }
  UserLikeList$ = new BehaviorSubject<any[]>([]);

  ngOnInit(): void {
    this.UserLikeList();
  }
  LikeAddBasket(UserLikeProduct: IList_Product, type: string, name: string): void {
    this.updatebasketservice.AddBasket(UserLikeProduct, type, name);
  }
  async addLike(UserLikeProduct: ILike_Item, color: string) {
    let dataResult: boolean = false;
    await this.like.AddOrRemoveUserLike(UserLikeProduct, color).finally(() => {
      dataResult = true;
    });
    if (dataResult) { this.UserLikeList(); }
  }
  async UserLikeList() {
    const promise = new Promise<void>((resolve) => {
      this.likedb.GetUserLike().subscribe((data: ILike_List[]) => {
        if (data.length == 0) { this.UserLikeList$.next(null); }
        else if (data.length > 0) {
          data.map((item: ILike_List) => {
            this.UserLikeList$.next(item.likeproduct);
            resolve();
          });
        }
      });
    });
    return await promise;
  }
}
