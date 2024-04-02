import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthSessionService } from '../services/AuthSessionService/auth-session-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmailVerified {

  constructor(private _authService: AuthSessionService,
    private _router : Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

      const userLogged : any = await this._authService.userLogged();

      if(userLogged){

        if(this._authService.isUserVerified()){
            return true;
        }

        alert("Sisuplau verifica el teu correu electronic per accedir");
        return false;
      }else{
        return false;
      }
  }

}
