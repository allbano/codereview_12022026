
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UserService } from '../../../user/services/user-service';
import { LoginInterface } from '../../model/login.interface';
import { UserProfile } from '../../../user/model/user.interface';

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
  userService: UserService = new UserService();

  loginForm: FormGroup = this.fb.group({
    user_email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage: string = '';

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: LoginInterface = {
        user_email: this.loginForm.value.user_email,
        user_password: this.loginForm.value.password
      };
      this.authService.login(credentials).subscribe({
             next: (response: UserProfile) => {
              const token:string = response.user_uuidv7.toString(); //toString só pr ter crtz q o angular n vai confundir as coisas
              localStorage.setItem('access_token', token);
              console.log('Token armazenado na variável:', token);
              
              this.userService.getUser(response.user_uuidv7);
              
              this.router.navigate(['/chat']);
            },
            error: (err) => {
              console.log("Erro bruto do servidor:", err.error);
  
              if (err.error && err.error.detail) {
                console.table(err.error.detail); // Exibe uma tabela com os campos que falharam
              }
              this.errorMessage = err;
            }
        });
    }
  }

  goBack(){
    this.router.navigate(['/']);
  }
}
