
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UserService } from '../../../user/services/user-service';

@Component({
  selector: 'app-form-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-login.html',
  styleUrl: './form-login.css',
})

export class FormLogin {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  userService = inject(UserService);

  loginForm: FormGroup = this.fb.group({
    user_email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage: string = '';

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm);
      this.authService.login(this.loginForm.value).subscribe({
             next: (response) => {
              console.log('Usuário autenticado:', response);

              //this.userService.currentUser.set(response.user); 
              this.userService.getUser(response.user_uuidv7)
              //console.log('obj userService: ', response.user_email);
              if (response.token) { //guarda user no local storage
                localStorage.setItem('access_token', response.token);
              }
              this.router.navigate(['/chat']);
            },
            error: (err) => {
              console.error('Erro detalhado:', err);
              this.errorMessage = 'Usuário não encontrado.';
            }
      });
    }
  }

  goBack(){
    this.router.navigate(['/']);
  }
}
