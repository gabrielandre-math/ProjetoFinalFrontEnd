import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Comanda } from '../models/Comanda';
import { catchError } from 'rxjs/operators';

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

    return this.http.get<Comanda[]>(this.baseUrl, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateComandaStatus(id: number, novoStatus: number): Observable<Comanda> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });

    return this.http.patch<Comanda>(`${this.baseUrl}/${id}/status`, novoStatus, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  createComanda(comanda: Comanda): Observable<Comanda> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });

    return this.http.post<Comanda>(this.baseUrl, comanda, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(`Server Error: ${error.message}`);
    return throwError('Ocorreu um erro na comunicação com o servidor. Por favor, tente novamente mais tarde.');
  }
}
