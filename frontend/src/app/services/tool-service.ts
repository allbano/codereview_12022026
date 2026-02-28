import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToolInfo } from '../features/model/tool.interface';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  private http = inject(HttpClient); 
  private readonly API_URL = '/api/tools'; 

  currentTool = signal<ToolInfo | null>(null);

  getTool(toolUuid: string) { //ja seta a data aq ao inves de no ngOnInit
    const url = `${this.API_URL}/${toolUuid}`;
    console.log('\ntool carregada: '+ `${this.API_URL}/${toolUuid}\n`);
    return this.http.get<any>(url);
  }

  updateProfile(dados: Partial<ToolInfo>): Observable<ToolInfo> {
    return this.http.put<ToolInfo>(`${this.API_URL}/${dados.tool_uuidv7}`, dados);
  }
  
}
