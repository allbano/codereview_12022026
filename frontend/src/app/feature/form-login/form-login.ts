
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-login.html',
  styleUrl: './form-login.css',
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router : Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      // Simulação de login Hard Coded
      if (email === 'admin@email.com' && password === '123456') {
        this.router.navigateByUrl('chat');
      } else {
        this.errorMessage = 'E-mail ou senha inválidos.';
      }
    }
  }
}
