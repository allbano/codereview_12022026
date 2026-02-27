// services/user.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../features/model/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient); 
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users'; 

 currentUser = signal<UserProfile | null>(null);

  getUser(id_user: number): void { //ja seta a data aq ao inves de no ngOnInit
    this.http.get<UserProfile>(`${this.API_URL}/${id_user}`).subscribe({
      next: (data) => this.currentUser.set(data), // Atualiza o sinal global
      error: (err) => console.error(err)
    });
  }

  updateProfile(dados: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.API_URL}/${dados.id}`, dados);
  }

  logout(): void {
    this.currentUser.set(null); // Limpa o usuário
    localStorage.removeItem('user_session'); // Limpa persistência se houver
    console.log("Usuário saiu.");
  }
}