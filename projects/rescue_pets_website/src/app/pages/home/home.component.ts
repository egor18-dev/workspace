import { Component, OnInit } from '@angular/core';
import { AuthSessionService, InfoService } from 'libRescue';
import { RescueService } from 'libRescue';
import { Router } from '@angular/router';

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
    return this._infoService.getData();
  }


}
