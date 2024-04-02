import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetModel } from 'libRescue';
import { Volunteer } from 'libRescue';
import { AuthSessionService } from 'libRescue';
import { VolunteerService } from 'libRescue';
import { RescueService } from 'libRescue';

@Component({
  selector: 'app-timetable-component',
  templateUrl: './timetable-component.component.html',
  styleUrls: ['./timetable-component.component.css']
})
export class TimetableComponentComponent {

  public pet !: PetModel;

  public hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  public id !: string;

  public volunteers !: Volunteer [];

  public add : number = 0;

  constructor (private _activatedRoute : ActivatedRoute,
    private _rescueService : RescueService,
    private _volunteersService : VolunteerService,
    private _auth : AuthSessionService) {
    }
    
    ngOnInit(): void {
      this._activatedRoute.params.subscribe((data) => {
        const id = data['id'];
        this.id = id;

        this._rescueService.retrieveAnimalById(id).then((pet : PetModel) => {
          this.pet = pet;
        });
      });    
    }

    volunteerAdd (index : number) {
      const date = new Date();
      date.setHours(this.hours[index], 0, 0);
      date.setDate(date.getDate() + this.add);

      this._volunteersService.addVolunteer(this.id, date);
    }

    retrieveByHour (i : number){
      return this._volunteersService.returnIsVolunteer(this.hours[i]);
    }

    getName(volunteer : any) {
      if(volunteer.length > 0){
       
      }
      return volunteer.length > 0 ? 'Ocupat' : 'No ocupat'; 
    }

   reload(i : number) {
      this.add = i;
      this._volunteersService.getVolunteers(this.add)
    }

}
