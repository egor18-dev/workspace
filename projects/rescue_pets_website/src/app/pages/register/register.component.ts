import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthSessionService } from 'libRescue';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formGroup !: FormGroup;

  constructor (private _formBuilder : FormBuilder,
    private _authSessionService : AuthSessionService) {
    this.formGroup = this._formBuilder.group({
      name : new FormControl("", Validators.required),
      surnames: new FormControl("", Validators.required),
      email : new FormControl("", [Validators.required, Validators.email]),
      password : new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }

  createAccount (data : any) {
    this._authSessionService.createAccount(data.name, data.surnames, data.email, data.password);
  } 

}
