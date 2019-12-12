import { Component, OnInit } from '@angular/core';
import {AlumnosI} from 'src/app/models/alumnos.interface';
import {ConsultasService} from 'src/app/services/consultas.service'
import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  alumno: AlumnosI={
    DNI: '',
    nombre: '',
    apellidos: '',
    edad: 0,
    direccion: '',
    ciclo: '',
    telefono: '',
    email: ''
  };
  alumnoId = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private queries:ConsultasService, private loadingController: LoadingController, private callNumber:CallNumber) { }

  ngOnInit() {
    this.alumnoId = this.route.snapshot.params['id'];
    if( this.alumnoId){
      this.loadAlumno(); 
    }
  }

  async loadAlumno(){
    const loading= await this.loadingController.create({
      message:'Loading...'
    });
    await loading.present();
    this.queries.getAlumno(this.alumnoId).subscribe(res=>{
      loading.dismiss();
      this.alumno = res;
    });
  }

  async saveAlumno(){
    const loading= await this.loadingController.create({
      message:'Saving...'
    });
    await loading.present();

    if(this.alumnoId){
      //update
     this.queries.updateAlumno(this.alumno,this.alumnoId).then(()=>{
       loading.dismiss();
       this.nav.navigateForward('/');
     });
    }else {
      //add
      this.queries.addAlumno(this.alumno).then(()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

  onRemove(alumnoId:string){
    console.log(alumnoId);
     this.queries.removeAlumno(alumnoId);
  }

  call(){
   this.callNumber.callNumber(this.alumno.telefono, true).then(()=>{
    console.log('funciona');
   }).catch((err)=>{
     alert(JSON.stringify(err))
   });
  }
}
