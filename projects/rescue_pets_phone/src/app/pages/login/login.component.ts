import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthSessionService } from 'libRescue';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formGroup !: FormGroup;

  constructor(private _formBuilder : FormBuilder,
    private _authSessionService : AuthSessionService) {
    this.formGroup = this._formBuilder.group({
      email : new FormControl("", [Validators.required, Validators.email]),
      password : new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }

  signIn(data : any) {
    this._authSessionService.login(data.email, data.password).then((res) => {
      console.log(`${res}`);
    }).catch((err) => {
      console.log(err);
    });
  }

  signInGoogle () {
    this._authSessionService.signInWithGoogle();
  }

}
