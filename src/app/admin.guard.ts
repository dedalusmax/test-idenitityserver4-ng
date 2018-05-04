import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private oidcSecurityService: OidcSecurityService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        return this.oidcSecurityService.getIsAuthorized().pipe(map(isAuthorized => {
            if (isAuthorized) {
                return true;
            } else {
                this.oidcSecurityService.authorize();
                return false;
            }
        }));
    }
}
