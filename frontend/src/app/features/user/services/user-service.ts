// services/user.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../model/user.interface';


@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient); 
  private readonly API_URL = '/api/users'; 
  private id = 0;

  currentUser = signal<UserProfile | null>(null);

  getUser(id_user: string): void { //ja seta a data aq ao inves de no ngOnInit
    this.http.get<UserProfile>(`${this.API_URL}/${id_user}`).subscribe({
      next: (data) => {
        this.id = data.user_uuidv7;
        this.currentUser.set(data); // Atualiza o sinal global
      },
      error: (err) => console.error(err)
    });
  }

  updateProfile(dados: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.API_URL}/${dados.user_uuidv7}`, dados);
  }

  logout() {
      const userId = this.currentUser()?.user_uuidv7;
      
      // Limpa o front
      this.currentUser.set(null);
      localStorage.clear();
      this.id = 0;

      if (userId) {
        //dispara o POST para o back
        this.http.post(`/api/auth/logout/${userId}`, {}).subscribe();
      }
    }
}