import { Component, OnInit } from '@angular/core';
import { DatabaseserviceService } from '../services/databaseservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  eventDetails: string | undefined;

  constructor(private databaseService: DatabaseserviceService, private router : Router
  ) {}
  
  pageTitle = '';
  actividad: any;

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.databaseService.getUserInfo(token).subscribe(userInfo => {
        this.pageTitle = userInfo.nombre;
        this.fetchEventosHoy();
      }, error => {
        console.error('Error al obtener información del usuario', error);
      });
    }
  }

  ionViewWillEnter() {
    this.fetchEventosHoy();
  }

  private fetchEventosHoy() {
    this.databaseService.getEventosHoy().subscribe(eventos => {
      if (eventos.length > 0) {
        // Assuming you want to display the first event's information
        const evento = eventos[0];
        this.actividad = evento;
        this.eventDetails = `Hoy tenemos el evento ${evento.nombre}. (~˘▾˘)~`;
        const botonAsistencia = document.getElementById('botonasistencia');
        if (botonAsistencia) {
          botonAsistencia.style.display = 'block';
        }
      } else {
        const botonAsistencia = document.getElementById('botonasistencia');
        if (botonAsistencia) {
          botonAsistencia.style.display = 'none';
        }
        this.eventDetails = 'No hay eventos hoy (╯°□°）╯︵ ┻━┻';
      }
    }, error => {
      
      const botonAsistencia = document.getElementById('botonasistencia');
      if (botonAsistencia) {
        botonAsistencia.style.display = 'none';
      }
      console.error('Error al obtener eventos de hoy', error);
      this.eventDetails = 'No hay eventos hoy (╯°□°）╯︵ ┻━┻';
    });
  }

  gotoAsistencia(event: Event) {
    event.stopPropagation(); // Evita que el clic en el botón también expanda/colapse el ítem
    this.router.navigate([`/asistencia/${this.actividad.id}`]);
  }
  
}
