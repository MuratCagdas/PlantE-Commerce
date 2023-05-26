import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';
import { AuthService, LoginResponseData } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passHide = true;
  constructor (
    private fb: FormBuilder,
    private authservice: AuthService,
    private alertfy: AlertifyService
  ) { }
  Loginform: FormGroup;
  public myError = (controlName: string, errorName: string) => {
    return this.Loginform.controls[controlName].hasError(errorName);
  };
  ngOnInit(): void {
    this.Loginform = this.fb.group({
      email: ["", [
        Validators.required
      ]],
      password: ["", [
        Validators.required
      ]]
    });
  }
  async LoginSubmit(user: LoginResponseData) {
    if (this.Loginform.valid) {
      await this.authservice.Login(user).then(res => { console.log(res); }, (err) => {
        this.alertfy.message(err.error, { messageType: MessageType.Error, position: Position.BottomCenter, delay: 2 });
      });
    }
    else {
      this.alertfy.message("Please fill the required", { messageType: MessageType.Error, position: Position.BottomCenter, delay: 2 });
    }
  }
}



