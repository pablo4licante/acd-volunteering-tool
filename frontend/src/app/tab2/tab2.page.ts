import { Component } from '@angular/core';
import { Actividad } from '../interfaces/actividad';
import { DatabaseserviceService } from '../services/databaseservice.service';
import Fuse from 'fuse.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  actividades: Actividad[] = [];
  filteredActividades: Actividad[] = [];
  fuse: Fuse<Actividad> = new Fuse([], { keys: ['nombre'] });
  expandedIndex: number | null = null; // Indice del ítem expandido

  constructor(private databaseService: DatabaseserviceService, private router: Router) {}

  ionViewWillEnter() {
    this.databaseService.getActividades().subscribe(
      (actividades: Actividad[]) => {
        this.actividades = actividades;
        this.filteredActividades = actividades; // Inicialmente, no filtrar

        // Configura Fuse.js
        const options = {
          includeScore: true,
          keys: ['nombre'] // Especifica qué campo(s) se deben buscar
        };
        this.fuse = new Fuse(this.actividades, options);
        
      }
    );
  }

  handleInput(event: CustomEvent) {
    const query = (event.target as HTMLInputElement).value;
    if (query) {
      this.filteredActividades = this.fuse.search(query).map(result => result.item);
    } else {
      this.filteredActividades = this.actividades;
    }
  }

  toggleExpand(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  buttonAction1(event: Event, actividad: Actividad) {
    event.stopPropagation(); // Evita que el clic en el botón también expanda/colapse el ítem
    if (actividad.id !== undefined) {
      this.databaseService.deleteActividad(actividad.id).subscribe(
        () => {
          console.log('Actividad eliminada correctamente');
          this.actividades = this.actividades.filter(a => a.id !== actividad.id);
          this.filteredActividades = this.filteredActividades.filter(a => a.id !== actividad.id);
        },
        error => {
          console.error('Error al eliminar actividad', error);
        }
      );
    } else {
      console.error('Actividad ID is undefined');
    }
  }
  

  buttonAction2(event: Event, actividad: Actividad) {
    event.stopPropagation(); // Evita que el clic en el botón también expanda/colapse el ítem
     }

  buttonAction3(event: Event, actividad: Actividad) {
    event.stopPropagation(); // Evita que el clic en el botón también expanda/colapse el ítem
    this.router.navigate([`/asistencia/${actividad.id}`]);
    }
}
