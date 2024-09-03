import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private baseUrl = 'http://localhost:8080/funcionarios';

  constructor(private http: HttpClient) {}

  // Método para buscar todos os funcionários
  findAll(): Observable<Funcionario[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Funcionario[]>(this.baseUrl, { headers });
  }

  // Método para buscar um funcionário pelo ID
  findById(id: number): Observable<Funcionario> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Funcionario>(url, { headers });
  }

  // Método para criar um novo funcionário
  create(funcionario: Funcionario): Observable<Funcionario> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Funcionario>(this.baseUrl, funcionario, { headers });
  }

  // Método para atualizar um funcionário existente
  updateFuncionario(id: number, funcionario: Partial<Funcionario>): Observable<Funcionario> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Funcionario>(url, funcionario, { headers });
  }

  // Método para deletar um funcionário
  deleteFuncionario(id: number): Observable<void> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  
}
