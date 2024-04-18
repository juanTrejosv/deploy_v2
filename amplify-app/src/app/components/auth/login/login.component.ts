import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from '../../../shared/services/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  // private authService = inject(AuthService);
  private cognitoService = inject(CognitoService)
  private router = inject( Router )

  public myForm : FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    // email: ['', [Validators.required, Validators.email]],
    // phone_number: []
  });

  login(){
    const { username, password } = this.myForm.value;

    let data = {
      username: username,
      password: password,
    }
    this.cognitoService.handleSignIn(data).then(data => console.log("error" + data))
  }
}
