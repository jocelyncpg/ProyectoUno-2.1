import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Timestamp } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Curso{
  id?:string,
  asignatura:string,
  fechaClase:Date, 
  presente?:boolean
}

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private collectionName="curso";
  constructor(private firestore:AngularFirestore) { }

  addCurso(curso: Curso): Promise<string> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).doc(id).set({ ...curso, id }).then(() => id);
  }
  

  getCurso():Observable<Curso[]>{
    return this.firestore.collection<Curso>(this.collectionName).valueChanges();
  }

  getCursosByAsignaturaId(asignaturaId: string): Observable<Curso[]> {
    return this.firestore.collection<Curso>('curso', ref =>
      ref.where('asignatura', '==', asignaturaId) 
    ).valueChanges({ idField: 'id' });
  }  
}
