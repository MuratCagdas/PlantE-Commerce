import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { ILike, ILike_Item, ILike_List } from 'src/app/ts/like';

@Injectable({
  providedIn: 'root'
})
export class LikeDbConnectService {
  constructor (
    private http: HttpClient
  ) { }
  private LikeUrl: string = 'http://localhost:3004/like';

  AddUserLike(like: ILike) {
    return this.http.post<ILike_Item>(this.LikeUrl, like);
  }
  GetUserLike() {

    return this.http.get<ILike_List[]>(this.LikeUrl + "?mail=" + this.GetMail());
  }
  UpdateUserLikeItem(id: number, likeproduct: ILike_Item[]) {
    return this.http.patch<ILike_Item[]>(this.LikeUrl + "/" + id, { likeproduct: likeproduct });
  }
  async RemoveUserLike(id: number) {
    const deleteObservable: Observable<ILike_List> = this.http.delete<ILike_List>(this.LikeUrl + "/" + id);
    await firstValueFrom(deleteObservable);
  }
  async GetUserLikeList(UserLikeID$: BehaviorSubject<number>, list$: BehaviorSubject<ILike_Item[]>) {
    const promise = new Promise<ILike_Item[] |void >((resolve, reject) => {
      this.http.get<ILike_List[]>(this.LikeUrl + "?mail=" + this.GetMail()).subscribe({
        next: ((res: ILike_List[]) => {
          res.map((x) => {
            list$.next(x.likeproduct);
            UserLikeID$.next(x.id);
          });
          resolve();
        }),
        error: ((err: any) => {
          reject(err);
          console.log(err)
        })
      });
    });
    return await promise;
  }
  GetMail(){
    const usermail: any = localStorage.getItem('mail');
    return usermail;
  }
}
