import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseserviceService } from '../services/databaseservice.service';
import { Actividad } from '../interfaces/actividad';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit, ViewWillEnter {

  actividadID: string = '';
  asistenciaTitle: string = '';
  usuarios: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private databaseService: DatabaseserviceService) { }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.actividadID = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.databaseService.getActividadById(parseInt(this.actividadID)).subscribe(
      (actividad: Actividad | null) => {
        if (actividad) {
          this.asistenciaTitle = actividad.nombre;
        } else {
          this.router.navigate(['/']);
        }
      },
      error => {
        console.error('Error fetching actividad:', error);
        this.router.navigate(['/']);
      }
    );
    this.getUsuarios();

    this.databaseService.getUsuariosByActividadId(parseInt(this.actividadID)).subscribe(
      (listaUsuariosAsistencia: any[]) => {
      listaUsuariosAsistencia.forEach(usuarioAsistencia => {
        const usuario = this.usuarios.find(u => u.Email === usuarioAsistencia.Voluntario);
        if (usuario) {
          usuario.checked = true;
        }
      });
      },
      error => {
      console.error('Error fetching usuarios:', error);
    });
  }

  getUsuarios() {
    this.databaseService.getVoluntarios().subscribe(
      (voluntarios: any[]) => {
        this.usuarios = voluntarios;
      },
      error => {
        console.error('Error fetching voluntarios:', error);
      }
    );
  }

  onCheckboxChange(event: any, usuario: any) {
    if (event.detail.checked) {
      // Si el checkbox está marcado
      this.databaseService.addAsistencia({ email: usuario.Email, actividadId: parseInt(this.actividadID) }).subscribe(
        response => {
          console.log('Asistencia añadida:', response);
        },
        error => {
          console.error('Error añadiendo asistencia:', error);
        }
      );
      // Realiza la acción correspondiente para el caso marcado
    } else {
      // Si el checkbox está desmarcado
      
      this.databaseService.deleteAsistencia({ email: usuario.Email, actividadId: parseInt(this.actividadID) }).subscribe(
        response => {
          console.log('Asistencia eliminada:', response);
        },
        error => {
          console.error('Error eliminando asistencia:', error);
        }
      );
      // Realiza la acción correspondiente para el caso desmarcado
    }
  }
}

