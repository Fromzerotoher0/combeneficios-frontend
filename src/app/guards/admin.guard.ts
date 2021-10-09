import { Injectable } from '@angular/core';
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
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    if (token.tipo_usuario === 1) {
      return true;
    } else {
      alert('no tienes permisos para acceder a esta pagina');
      this.router.navigateByUrl(`/app/homePage`);
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
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    if (token.tipo_usuario === 1) {
      return true;
    } else {
      alert('no tienes permisos para acceder a esta pagina');
      this.router.navigateByUrl(`/app/homePage`);
      return false;
    }
  }
}
