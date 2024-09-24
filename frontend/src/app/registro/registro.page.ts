import { Component, OnInit } from '@angular/core';
import { DatabaseserviceService } from '../services/databaseservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  ngOnInit() {
  }

  nombre: string | undefined;
  apellidos: string | undefined;
  email: string | undefined;
  fechaNacimiento: string | undefined;
  password: string | undefined;

  constructor(private databaseService: DatabaseserviceService, private router: Router) { }

  onSubmit() {
    const voluntario = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      fechaNacimiento: this.fechaNacimiento,
      password: this.password // Incluir la contraseña
    };

    this.databaseService.addVoluntario(voluntario).subscribe(
      response => {
        console.log('Voluntario registrado exitosamente', response);
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
      },
      error => {
        console.error('Error al registrar voluntario', error);
      }
    );
  }
}
