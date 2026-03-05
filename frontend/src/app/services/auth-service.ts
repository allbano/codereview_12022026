// services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service';
import { UserProfile } from '../features/model/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/auth/login'; 

  login(credentials: any) {
    const payload = {
      user_email: credentials.user_email,    
      user_password: credentials.password 
    };
    //console.log("email e senha: ", payload);
    return this.http.post<any>(this.API_URL, payload);
  }

  logout(userId: any) {
    return this.http.post(`/api/auth/logout/${userId.user_uuidv7}`, {});
  }
}