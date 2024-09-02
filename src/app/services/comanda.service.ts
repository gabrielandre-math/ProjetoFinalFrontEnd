import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comanda } from '../models/Comanda';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {
  private baseUrl = 'http://localhost:8080/comandas';

  constructor(private http: HttpClient) {}

  getComandas(): Observable<Comanda[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Comanda[]>(this.baseUrl, { headers });
  }

  updateComandaStatus(id: number, novoStatus: number): Observable<Comanda> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
    });

    return this.http.patch<Comanda>(`http://localhost:8080/comandas/${id}/status`, novoStatus, { headers });
  }
}
