import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UpdatebasketService } from 'src/app/services/basket/updatebasket.service';
import { _isAuthenticated } from 'src/app/services/identity/identity.service';
import { LikeService } from 'src/app/services/like/like.service';
import { ProductService} from 'src/app/services/product/product.service';
import { ILike_Item } from 'src/app/ts/like';
import { IList_Product } from 'src/app/ts/product';

@Component({
  selector: 'app-outdoor',
  templateUrl: './outdoor.component.html',
  styleUrls: ['./outdoor.component.css']
})
export class OutdoorComponent implements OnInit {

  constructor (
    private updatebasketservice: UpdatebasketService,
    private productservice: ProductService,
    private like: LikeService
  ) { }
  private productType: string = 'outdoor';
  outdoorList$ = new BehaviorSubject<any[]>([]);

  ngOnInit(): void {
    this.productservice.AuthUserGetProduct_PublicProduct(this.productType, this.outdoorList$);
  }
  OutdoorAddBasket(outdoorProduct: IList_Product, type: string, name: string): void {
    this.updatebasketservice.AddBasket(outdoorProduct, type, name);
  }
  addLike(outdoorProduct: ILike_Item, color: string) {
    this.like.AddOrRemoveUserLike(outdoorProduct, color);
    this.productservice.AuthUserGetProduct_PublicProduct(this.productType, this.outdoorList$);
  }
}
