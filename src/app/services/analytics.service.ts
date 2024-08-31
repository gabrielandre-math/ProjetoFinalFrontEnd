import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthlyData } from '../models/MonthlyData';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:8080/api/analytics';  // URL do backend

  constructor(private http: HttpClient) { }

  getAnalytics(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getMonthlyData(): Observable<MonthlyData> {
    return this.http.get<MonthlyData>(`${this.apiUrl}/monthly-data`);
  }

  getPriorityData(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/priority-data`);
  }
}
