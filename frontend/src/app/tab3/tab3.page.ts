import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  activity = {
    name: '',
    date: '',
    hours: null
  };

  onSubmit() {
    if (this.activity.name && this.activity.date && this.activity.hours) {
      // Aquí puedes agregar la lógica para procesar los datos del formulario
      console.log('Formulario enviado:', this.activity);
      // Ejemplo: enviar los datos a un servidor o almacenarlos en una base de datos
    } else {
      console.log('Por favor, complete todos los campos.');
    }
  }
}
