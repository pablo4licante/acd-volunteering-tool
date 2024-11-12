import { Component, OnInit } from '@angular/core';
import { DatabaseserviceService } from '../services/databaseservice.service';
import { Actividad } from '../interfaces/actividad';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {


  actividades: Actividad[] = [];
  
  constructor(private databaseService: DatabaseserviceService) { }
  
  ngOnInit() {
    this.fetchActividades();
  }
  
  fetchActividades() {
    this.databaseService.getActividades().subscribe(
      (actividades: Actividad[]) => {
        this.actividades = actividades;
      },
      error => {
        console.error('Error fetching actividades:', error);
      }
    );
  }
}