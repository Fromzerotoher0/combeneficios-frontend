import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.jwtHelper.isTokenExpired(localStorage.getItem('jwt')!) === true) {
      localStorage.removeItem('jwt');
      alert('sesion expirada');
    }
    if (localStorage.getItem('jwt')) {
      return true;
    } else {
      this.router.navigateByUrl(`/auth/login`);
      return false;
    }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.jwtHelper.isTokenExpired(localStorage.getItem('jwt')!) === true) {
      localStorage.removeItem('jwt');
      alert('sesion expirada');
    }
    if (localStorage.getItem('jwt')) {
      return true;
    } else {
      this.router.navigateByUrl(`/auth/login`);
      return false;
    }
  }
}
