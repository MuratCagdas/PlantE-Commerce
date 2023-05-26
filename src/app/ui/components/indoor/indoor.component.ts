import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UpdatebasketService } from 'src/app/services/basket/updatebasket.service';
import { LikeService } from 'src/app/services/like/like.service';
import { ProductService} from 'src/app/services/product/product.service';
import { ILike_Item } from 'src/app/ts/like';
import { IList_Product } from 'src/app/ts/product';

@Component({
  selector: 'app-indoor',
  templateUrl: './indoor.component.html',
  styleUrls: ['./indoor.component.css']
})
export class IndoorComponent implements OnInit {

  constructor (
    private updatebasketservice: UpdatebasketService,
    private productservice: ProductService,
    private like: LikeService,
  ) { }
  private productType: string = 'indoor';
  indoorList$ = new BehaviorSubject<any[]>([]);

  ngOnInit(): void {
    this.productservice.AuthUserGetProduct_PublicProduct(this.productType, this.indoorList$);
  }
  IndoorAddBasket(outdoorProduct: IList_Product, type: string, name: string) {
    this.updatebasketservice.AddBasket(outdoorProduct, type, name);
  }
  addLike(indoorProduct: ILike_Item, color: string) {
    this.like.AddOrRemoveUserLike(indoorProduct, color);
    this.productservice.AuthUserGetProduct_PublicProduct(this.productType, this.indoorList$);
  }
}
