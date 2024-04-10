import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RescueService } from 'libRescue';
import { PetModel } from 'libRescue';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit{

  public pet !: PetModel;

  public actualImg : number = 0;

  constructor (private _activatedRoute : ActivatedRoute,
    private _rescueService : RescueService) {}
    
    ngOnInit(): void {
      this._activatedRoute.params.subscribe((data) => {
        const id = data['id'];

        this._rescueService.retrieveAnimalById(id).then((pet : PetModel) => {
          this.pet = pet;
        });
      });    
    }

    getImg()
    {
      return this.pet.carousel_imgs[this.actualImg];
    }

    move(number : number)
    {
      this.actualImg += number;

      if(this.actualImg === -1) this.actualImg = 0;
      if(this.actualImg === this.pet.carousel_imgs.length) this.actualImg = this.pet.carousel_imgs.length - 1;
    }

}
