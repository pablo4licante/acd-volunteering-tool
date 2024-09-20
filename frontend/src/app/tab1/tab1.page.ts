import { Component, OnInit } from '@angular/core';
import { DatabaseserviceService } from '../services/databaseservice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

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
      }, error => {
        console.error('Error al obtener información del usuario', error);
      });
    }
  }
  
}
