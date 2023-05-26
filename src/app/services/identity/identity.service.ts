import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { AlertifyService, MessageType, Position } from '../alertify/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor (
    private jwthelp: JwtHelperService,
    private route: Router,
    private alertify: AlertifyService
  ) { }
  public get isauthenticated(): boolean {
    return _isAuthenticated;
  }
  public get isAdminAccess(): boolean {
    return _isAdminAccess;
  }
  TokenCheck() {
    const token: any = sessionStorage.getItem('accesstoken');
    let expired: boolean | Promise<boolean>;
    try {
      expired = this.jwthelp.isTokenExpired(token);
    } catch {
      expired = true;
    }
    _isAuthenticated = ((token != null) && (!expired));
  }
  userrole$ = new BehaviorSubject<string>(null);
  identityCheck(): string {
    let userrole: string;

    this.userrole$.subscribe(data => {
      userrole = data;
      if (userrole === 'admin') { _isAdminAccess = true; }
    });
    return userrole;
  }
  LogOut() {
    sessionStorage.removeItem('accesstoken');
    localStorage.removeItem('mail');
    _isAuthenticated = false;
    _isAdminAccess = false;
    this.userrole$.next(null);
    this.route.navigate(['']);
    this.alertify.message('Success Logout', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
  }
}
export let _isAuthenticated: boolean;
export let _isAdminAccess: boolean = false;

