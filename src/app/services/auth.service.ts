import { Injectable } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { 

  }
  checkCpfExists(cpf: string) {
    return this.http.get<boolean>(`http://localhost:8080/api/check-cpf?cpf=${cpf}`);
  }
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/api/check-email?email=${email}`);
  }
  authenticate(creds: any) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }
  register(newUser: any) {
    return this.http.post('http://localhost:8080/clientes', newUser, {
      observe: 'response',
      responseType: 'text'
    });
  }

  findAll(): Observable<Cliente[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Cliente[]>('http://localhost:8080/clientes', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
  
  
  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  logout() {
    localStorage.removeItem('token');
  }

}
