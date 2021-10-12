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
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorGuard implements CanActivate, CanLoad {
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
    if (token.tipo_usuario === 1 || token.tipo_usuario === 4) {
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
    if (token.tipo_usuario === 1 || token.tipo_usuario === 4) {
      return true;
    } else {
      alert('no tienes permisos para acceder a esta pagina');
      this.router.navigateByUrl(`/app/homePage`);
      return false;
    }
  }
}
