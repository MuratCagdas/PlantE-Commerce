import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';
import { IdentityService } from 'src/app/services/identity/identity.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor (
    private alertfy: AlertifyService,
    private identityservice: IdentityService,
    private router: Router,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.RoleMatch(route);
  }
  private RoleMatch(route: ActivatedRouteSnapshot): boolean {
    const RoutingModuleRole: any[] = route.data['role'];
    const rolematches = RoutingModuleRole.indexOf(this.identityservice.identityCheck());
    if (rolematches < 0) {
      this.router.navigate(['/login']);
      this.alertfy.message("Unauthorized access ", { messageType: MessageType.Error, position: Position.BottomCenter, delay: 2 });
      return false;
    }
    return true;
  }

}