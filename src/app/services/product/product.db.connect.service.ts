import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IList_Product, IProduct } from 'src/app/ts/product';
import { __await } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ProductDbConnectService {

  constructor (
    private http: HttpClient,
    ) { }
  private ProductURl: string = " http://localhost:3004/products";

  SaveData(Addproduct: IProduct) {
    return this.http.post<IProduct>(this.ProductURl, Addproduct);
  }
  async GetTypeProduct(type: string, List: BehaviorSubject<IList_Product[]>) {
    const promise = new Promise<IList_Product[] | void>((resolve, reject) => {
      this.http.get<IList_Product[]>(this.ProductURl + '?type=' + type).subscribe({
        next: ((res: IList_Product[]) => {
          List.next(res);
          resolve();
        }),
        error: ((err: HttpErrorResponse) => {
          reject(err);
        })
      });
    });
    return await promise;
  }
  async DeleteProductData(id: any) {
    const deleteObservable: Observable<IProduct> = this.http.delete<IProduct>(this.ProductURl + "/" + id);
    await firstValueFrom(deleteObservable);
  }
  UpdateProductItemPeace(id: number, item: IList_Product) {
    return this.http.patch<IList_Product>(this.ProductURl + "/" + id, item);
  }
}
