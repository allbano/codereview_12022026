// services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/auth/login'; 

  login(credentials: any) {
    return this.http.post<any>(this.API_URL, credentials);
  }
}