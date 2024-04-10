import { Component, OnInit } from '@angular/core';
import { AuthSessionService } from 'libRescue';
import { RescueService } from 'libRescue';
import { Router } from '@angular/router';
import { InfoService } from 'projects/lib-rescue/src/lib/services/Info/info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  constructor (private _infoService : InfoService) {}

  ngOnInit(): void {
  }

  getData ()
  {
    const data : any = this._infoService.getData();
    console.log(data);

    return data;
  }


}
