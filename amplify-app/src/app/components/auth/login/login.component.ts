import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from '../../../shared/services/cognito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {

  statusLogging: string = '';

  codeV: number = 0;

  private fb = inject(FormBuilder);
  // private authService = inject(AuthService);
  private cognitoService = inject(CognitoService)
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    // email: ['', [Validators.required, Validators.email]],
    // phone_number: []
  });

  public myFormCode: FormGroup = this.fb.group({
    code_verification: ['', [Validators.required]]
  });


  login() {
    const { username, password } = this.myForm.value;

    let data = {
      username: username,
      password: password,
    }
    this.cognitoService.getStatusLog$().subscribe(
      data => { this.statusLogging = data }
    )
    this.cognitoService.handleSignIn(data)
  }

  getCode() {
    const { code_verification } = this.myFormCode.value;
    console.log("code_verification", code_verification);
    const { username } = this.myForm.value;
    alert(code_verification);
    alert(username);

    let data = {
      username: username,
      confirmationCode: code_verification
    }

    this.cognitoService.handleSignUpConfirmation(data)
  }
}
