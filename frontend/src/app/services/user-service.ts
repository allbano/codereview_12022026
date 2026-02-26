// services/user.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../features/model/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient); 
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users'; 

  // Remova as variáveis estáticas user_id e API_URL_ID daqui

  getUser(id_user: number): Observable<UserProfile> {
    const url = `${this.API_URL}/${id_user}`;
    return this.http.get<UserProfile>(url);
  }

  updateProfile(dados: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.API_URL}/${dados.id}`, dados);
  }
}