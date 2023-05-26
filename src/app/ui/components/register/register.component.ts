import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPasswordValidator } from './matchPassword';
import { AuthService, RegisterData } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor (
    private fb: FormBuilder,
    private authservice: AuthService,
    private route: Router,
    private alertfy: AlertifyService) { }

  passHide = true;
  repassHide = true;
  Registerform: FormGroup;

  ngOnInit(): void {
    this.Registerform = this.fb.group({
      name: ["", [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3)
      ]],
      surname: ["", [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.email
      ]],
      password: ["", [
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(3),
        matchPasswordValidator('repassword', true)
      ]],
      repassword: ["", [
        Validators.required,
        matchPasswordValidator('password')
      ]],
      role: ["user",]
    });
  }
  public myError = (controlName: string, errorName: string) => {
    return this.Registerform.controls[controlName].hasError(errorName);
  };
  RegisterSubmit(user: RegisterData) {
    if (this.Registerform.valid) {
      this.authservice.Register(user).subscribe((res: RegisterData) => {
        this.alertfy.message('Successful', { messageType: MessageType.Success, position: Position.BottomCenter, delay: 2 });
        this.route.navigate(['/login']);
      });
    } else {
      this.alertfy.message('Fill in the required', { messageType: MessageType.Error, position: Position.BottomCenter, delay: 2 });
    }
  }
}

