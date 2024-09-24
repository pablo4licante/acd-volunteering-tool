import { Component, OnInit } from '@angular/core';
import { DatabaseserviceService } from '../services/databaseservice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  eventDetails: string | undefined;

  constructor(private databaseService: DatabaseserviceService
  ) {}
  
  pageTitle = '';

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    if (token) {
      this.databaseService.getUserInfo(token).subscribe(userInfo => {
        console.log(userInfo);
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
        console.log('Eventos de hoy:', eventos);
        // Assuming you want to display the first event's information
        const evento = eventos[0];
        this.eventDetails = `Hoy tenemos el evento ${evento.nombre}. (~˘▾˘)~`;
      } else {
        console.log('No hay eventos hoy');
        this.eventDetails = 'No hay eventos hoy (╯°□°）╯︵ ┻━┻';
      }
    }, error => {
      console.error('Error al obtener eventos de hoy', error);
      this.eventDetails = 'No hay eventos hoy (╯°□°）╯︵ ┻━┻';
    });
  }
  
}
