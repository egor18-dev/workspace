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

}
