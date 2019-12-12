import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { AlumnosI } from '../models/alumnos.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  private alumnosCollection: AngularFirestoreCollection<AlumnosI>;
  private alumnos: Observable<AlumnosI[]>;


  constructor(db:AngularFirestore) { 
    this.alumnosCollection =db.collection<AlumnosI>('Alumnos');
    this.alumnos=this.alumnosCollection.snapshotChanges().pipe(map(actions =>{
      return actions.map( a=> {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
  }

  getAlumnos(){
    return this.alumnos;
  }


  getAlumno(id:string){
    return this.alumnosCollection.doc<AlumnosI>(id).valueChanges();
  }

 updateAlumno(alumno:AlumnosI, id:string){
   return this.alumnosCollection.doc(id).update(alumno);
 }


  addAlumno(alumno:AlumnosI){
    return this.alumnosCollection.add(alumno);
  }


 removeAlumno(id:string){
   return this.alumnosCollection.doc(id).delete();
 }

}

