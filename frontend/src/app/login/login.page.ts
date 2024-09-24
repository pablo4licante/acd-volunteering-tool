import { Component, OnInit } from '@angular/core';

import { DatabaseserviceService } from '../services/databaseservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private databaseService: DatabaseserviceService) { }

  ngOnInit() {
  }
  email = '';
  password = '';

  onSubmit() {
    this.databaseService.login(this.email, this.password).subscribe({
      next: (response) => {
      if (response && response.success && response.token) {
        localStorage.setItem('jwtToken', response.token);
        // Redirigir al usuario a /tabs/tab1
        window.location.href = '/tabs/tab1';
      } 
      },
      error: (error) => {
      console.error('Error al iniciar sesión', error);
      }
    });
  }
  

}
