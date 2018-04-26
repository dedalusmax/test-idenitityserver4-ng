import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private oidcSecurityService: OidcSecurityService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log(route + '' + state);
        console.log('AuthorizationGuard, canActivate');

        return this.oidcSecurityService.getIsAuthorized().pipe(map(isAuthorized => {
            console.log('AuthorizationGuard, canActivate isAuthorized: ' + isAuthorized);

            if (isAuthorized) {
                return true;
            } else {
                // tslint:disable-next-line:no-floating-promises
                this.router.navigate(['/login']);
                return false;
            }
        }));
    }
}
