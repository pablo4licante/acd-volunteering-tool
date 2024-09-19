import { Component } from '@angular/core';
import { Actividad } from '../interfaces/actividad';
import { DatabaseserviceService } from '../services/databaseservice.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  activity: Actividad = {
    nombre: '',
    fecha: '',
    horas: 0
  };

  constructor(private databaseService: DatabaseserviceService, private router: Router) {}

  onSubmit() {
    if (this.activity.nombre && this.activity.fecha && this.activity.horas) {
      // Llama al método del servicio para agregar la actividad
      this.databaseService.addActividad(this.activity).subscribe(
        response => {
          console.log('Actividad agregada exitosamente:', response);
          // Limpia el formulario o realiza otras acciones según sea necesario
          this.activity = { nombre: '', fecha: '', horas: 0 };
          this.router.navigate(['/tabs/tab1']);
        },
        error => {
          console.error('Error al agregar actividad:', error);
        }
      );
    } else {
      console.log('Por favor, complete todos los campos.');
    }
  }
}

