// services/auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInterface } from '../model/login.interface';
import { UserProfile } from '../../user/model/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/auth/login'; 
  loginUser = signal<LoginInterface | null>(null);

  login(credentials: LoginInterface) {
    return this.http.post<UserProfile>(this.API_URL, credentials);
  }

  logout(userUuid: string) {
    const url = `$/api/auth/logout/${userUuid}`;
    return this.http.post(url, {});
  }
}