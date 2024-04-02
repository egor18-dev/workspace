import { Component, OnInit } from '@angular/core';
import { AuthSessionService } from 'libRescue';
import { RescueService } from 'libRescue';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  constructor () {}

  ngOnInit(): void {
  }


}
