import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Cadpaciente } from '../shared/cadpaciente.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadpacienteService {
  private cadpacientesCollection: AngularFirestoreCollection<Cadpaciente>;

  constructor(private afs: AngularFirestore) {
    this.cadpacientesCollection = this.afs.collection<Cadpaciente>('Cadpacientes');
  }

  getCadpacientes() {
    return this.cadpacientesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        }
        );
      })
    );

  }

  addCadpaciente(cadpaciente: Cadpaciente) {
    return this.cadpacientesCollection.add(cadpaciente);
  }

  getCadpaciente(id: string) {
    return this.cadpacientesCollection.doc<Cadpaciente>(id).valueChanges();

  }

  updateCadpaciente(id: string, cadpaciente: Cadpaciente) {
    return this.cadpacientesCollection.doc<Cadpaciente>(id).update(cadpaciente);
  }

  deleteCadpaciente(id: string) {
    return this.cadpacientesCollection.doc(id).delete();
  }

}

