import { Injectable } from '@angular/core';
import { DatabaseserviceService } from './databaseservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private databaseService: DatabaseserviceService) { }

  isAuthenticated(): boolean {
    // Implementa la lógica para verificar si el usuario está autenticado
    // Esto puede ser mediante un token almacenado en localStorage o alguna otra lógica
    return !!localStorage.getItem('jwtToken');
    
  }
  
  async isAdmin(): Promise<boolean> {
    let token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const userInfo = await this.databaseService.getUserInfo(token).toPromise();
        return userInfo.administrador === 1;
      } catch (error) {
        console.error('Error al obtener información del usuario', error);
        return false;
      }
    } else {
      return false;
    }
  }

}