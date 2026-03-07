// services/user.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../model/user.interface';
import { AuthService } from '../../auth/services/auth-service';


@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient); 
  private readonly API_URL = '/api/users'; 
  private id: string = '';
  private authService = inject(AuthService);

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
    const user = this.currentUser();
    //console.log('\nCURRENTUSER'+ this.currentUser())
    if (user?.user_uuidv7) {
      this.authService.logout(user.user_uuidv7).subscribe({
        next: () => {
          console.log('Logout no servidor concluído');
          this.limparDadosLocais();
        },
        error: (err) => {
          console.error('Erro no servidor, mas limpando localmente', err);
          this.limparDadosLocais();
        }
      });
    } else {
      console.log('SAPORRA ENTROU NO ELSE\n')
      this.limparDadosLocais();
    }
  }

  private limparDadosLocais() {
    this.currentUser.set(null);
    localStorage.clear();
  }
}
