import { Component } from '@angular/core';
import { RescueService } from 'libRescue';
import { PetModel } from 'libRescue';
import { Router } from '@angular/router';
import { AuthSessionService } from 'libRescue';
import { UserModel } from 'libRescue';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent {

  public pets !: PetModel [];

  public isUserLogged : boolean = false;
  public isAdmin : boolean = false;

  constructor (private _resuceService : RescueService,
    private _router : Router,
    private _auth : AuthSessionService) {}

  ngOnInit(): void {
    this._auth.userLogged().then((uid : any) => {
      if(uid){
        this.isUserLogged = true;

        this._auth.getUserByUid(uid).then((userModel : UserModel) => {
          this.isAdmin = userModel.role === "admin" ? true : false;
        });
      } 
      else this.isUserLogged = false;
    }).catch(() => this.isUserLogged = false);
  }

  delete (index : number , id : string) {
    this._resuceService.delteById(id);
    this.pets.splice(index, 1);
  }

  getPets () {
    return this._resuceService.getPets();
  }

  edit(id : string){
    this._router.navigate([`/modifyPet/${id}`]);
  }

}
