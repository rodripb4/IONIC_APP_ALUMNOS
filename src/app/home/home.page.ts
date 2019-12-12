import { Component, OnInit } from '@angular/core';
import {AlumnosI} from '../models/alumnos.interface';
import {ConsultasService} from '../services/consultas.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  alumnos: AlumnosI[];

  buscarParametro = '';

  alumnoId = null;

constructor(private queriesService:ConsultasService, private emailComposer: EmailComposer){ }
 ngOnInit(){
   this.queriesService.getAlumnos().subscribe(res=> this.alumnos = res);
 }


 buscarAlumno(event){
 const texto =event.target.value;
 this.buscarParametro = texto;
 console.log(texto);
 }



 sendEmail(){
   let email ={
     to: '',
     cc: '',
     subject: '',
     body: '',
     isHtml: true
   };
   this.emailComposer.open(email);
 }

}
