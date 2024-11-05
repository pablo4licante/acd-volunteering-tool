import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Actividad } from '../interfaces/actividad';

@Injectable({
  providedIn: 'root'
})
export class DatabaseserviceService {
  private apiUrl = 'https://acd-volunteering-tool.onrender.com'; // URL de tu backend

  constructor(private http: HttpClient) { }
  
  // Función para agregar una actividad
  addActividad(actividad: Actividad): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-actividad`, actividad)
      .pipe(
        catchError(error => {
          console.error('Error al agregar actividad', error);
          return throwError(error);
        })
      );
  }

  // Función para obtener todas las actividades
  getActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.apiUrl}/actividades`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener actividades', error);
          return throwError(error);
        })
      );
  }

  // Función para obtener una actividad por ID
  getActividadById(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.apiUrl}/actividad/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener actividad', error);
          return throwError(error);
        })
      );
  }

  // Función para actualizar una actividad
  updateActividad(id: number, actividad: Actividad): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-actividad/${id}`, actividad)
      .pipe(
        catchError(error => {
          console.error('Error al actualizar actividad', error);
          return throwError(error);
        })
      );
  }

  // Función para eliminar una actividad
  deleteActividad(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-actividad/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar actividad', error);
          return throwError(error);
        })
      );
    }
  // Función para agregar un voluntario
  addVoluntario(voluntario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-voluntario`, voluntario)
      .pipe(
        catchError(error => {
          console.error('Error al agregar voluntario', error);
          return throwError(() => error);
        })
      );
  }
  
  // Función para iniciar sesión
  login(email: string, password: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al iniciar sesión', error);
          return throwError(() => error);
        })
      );
  }

  // Función para obtener eventos de hoy
  getEventosHoy(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/eventos-hoy`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener eventos de hoy', error);
          return throwError(() => error);
        })
      );
  }

  // Devuelve la informacion del usuario en base a su JWT Token
  getUserInfo(token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl}/get-user-info`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener información del usuario', error);
          return throwError(() => error);
        })
      );
  }
  

  // Función para obtener todos los voluntarios
  getVoluntarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/voluntarios`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener voluntarios', error);
          return throwError(() => error);
        })
      );
  }

  // Función para obtener un voluntario por email
  getVoluntarioByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/voluntario/${email}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener voluntario', error);
          return throwError(() => error);
        })
      );
  }

  // Función para actualizar un voluntario
  updateVoluntario(email: string, voluntario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-voluntario/${email}`, voluntario)
      .pipe(
        catchError(error => {
          console.error('Error al actualizar voluntario', error);
          return throwError(() => error);
        })
      );
  }

  // Función para eliminar un voluntario
  deleteVoluntario(email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-voluntario/${email}`)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar voluntario', error);
          return throwError(() => error);
        })
      );
  }

  // Función para agregar asistencia
  addAsistencia(asistencia: { email: string, actividadId: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-asistencia`, asistencia)
      .pipe(
        catchError(error => {
          console.error('Error al agregar asistencia', error);
          return throwError(() => error);
        })
      );
  }

  // Función para obtener todos los usuarios de la tabla Asistencia en base a una id de actividad
  getUsuariosByActividadId(actividadId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asistencia/${actividadId}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener usuarios de la asistencia', error);
          return throwError(() => error);
        })
      );
  }

  // Función para registrar un nuevo usuario
  register(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, usuario)
      .pipe(
        catchError(error => {
          console.error('Error al registrar usuario', error);
          return throwError(() => error);
        })
      );
  }

  // Función para eliminar asistencia
  deleteAsistencia(asistencia: { email: string, actividadId: number }): Observable<any> {
    return this.http.request<any>('delete', `${this.apiUrl}/delete-asistencia`, { body: asistencia })
      .pipe(
        catchError(error => {
          console.error('Error al eliminar asistencia', error);
          return throwError(() => error);
        })
      );
  }
}
