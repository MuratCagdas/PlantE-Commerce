import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';
import { IdentityService, _isAuthenticated } from 'src/app/services/identity/identity.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private router: Router,
    private alertfy: AlertifyService,
    private identityservice: IdentityService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.identityservice.TokenCheck();
    if (!_isAuthenticated) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      this.alertfy.message('Please Login', { messageType: MessageType.Warning, position: Position.BottomCenter, delay: 2 });
    }
    return true;

  }

}
