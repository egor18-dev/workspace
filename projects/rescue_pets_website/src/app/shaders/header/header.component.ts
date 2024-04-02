import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthSessionService } from 'libRescue';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  public isUserLogged : boolean = false;

  constructor (private _authSessionService : AuthSessionService,
    private _router : Router,
    private _auth : AuthSessionService) {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event : any) => {
      this.checkSession();
    });
  }

  ngOnInit(): void {
    this.checkSession();
  }

  checkSession () {
    this._authSessionService.userLogged().then((uid : any) => {
      this.isUserLogged = uid ? true : false;
    }).catch(() => this.isUserLogged = false);
  }

  logOut (){
    this._authSessionService.logout();
    this.isUserLogged = false;
  }

  checkUserIsAdmin (){
    return this._auth.getCheckUserAdmin();
  }

}
