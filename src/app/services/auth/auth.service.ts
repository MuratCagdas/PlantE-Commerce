import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdentityService } from '../identity/identity.service';
import { AlertifyService, MessageType, Position } from '../alertify/alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (
    private http: HttpClient,
    private identityservice: IdentityService,
    private route: Router,
    private alertfy: AlertifyService
  ) { }
  private RegisterUrl: string = 'http://localhost:3000/register';
  private LoginUrl: string = 'http://localhost:3000/login';

  Register(registerdata: RegisterData) {
    const observable: Observable<RegisterData> = this.http.post<RegisterData>(this.RegisterUrl, registerdata);
    return observable;
  }
  async Login(logindata: LoginResponseData) {
    const promise = new Promise<LoginResponseData >((resolve, reject) => {
      this.http.post<LoginResponseData>(this.LoginUrl, logindata).subscribe({
        next: ((data: LoginResponseData) => {
          this.identityservice.TokenCheck();
          sessionStorage.setItem('accesstoken', data.accessToken);
          localStorage.setItem('mail', data.user.email);
          let userrole: string = data.user.role;
          this.identityservice.userrole$.next(userrole);
          this.route.navigate(['/indoor']);
          this.alertfy.message('Successful', { messageType: MessageType.Success, position: Position.BottomCenter, delay: 2 });
          resolve(data);
        }),
        error: ((err: any) => {
          reject(err);
        })
      });
    });
    return await promise;
  }
}
export interface RegisterData {
  name: string,
  surname: string,
  email: string,
  password: string,
  repassword: string,
  role: string,
  id: string;
}
export interface LoginResponseData {
  accessToken: string,
  user: RegisterData;
}
