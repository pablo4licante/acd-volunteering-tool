// src/app/services/database.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://localhost:3000'; // URL de tu backend

  constructor(private http: HttpClient) { }

  createTable(tableName: string, columns: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-table`, { tableName, columns });
  }
}
