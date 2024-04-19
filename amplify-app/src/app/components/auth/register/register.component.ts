import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from '../../../shared/services/cognito.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  // private authService = inject(AuthService);
  private cognitoService = inject(CognitoService)
  private router = inject( Router )

  public myForm : FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    phone_number: [null]
  });

  register(){
    const { username, password, phone_number, email } = this.myForm.value;

    // const parse_phone_number = parseInt(phone_number);
    let data = {
      username: username,
      password: password,
      phone_number: phone_number || null,
      email: email
    }
    this.cognitoService.handleSignUp(data).then(data => console.log("error" + data))
  }

}
