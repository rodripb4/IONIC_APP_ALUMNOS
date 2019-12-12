import { Pipe, PipeTransform } from '@angular/core';
import { AlumnosI } from '../models/alumnos.interface';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(alumnos: AlumnosI[], texto: string): AlumnosI[] {
    
    if(texto.length===0){
      return alumnos
    }
    
    texto=texto.toLowerCase();

      return alumnos.filter( alumno =>{
      return alumno.apellidos.includes(texto)
      || alumno.DNI.includes(texto)
      || alumno.nombre.includes(texto)
      || alumno.ciclo.includes(texto)
      || alumno.direccion.includes(texto)
      || alumno.email.includes(texto);
    });



  }

}
