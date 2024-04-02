import { Injectable } from '@angular/core';
import { Firestore, collectionData, Query, query, where, CollectionReference, collection, doc, deleteDoc } from '@angular/fire/firestore';
import { addDoc, DocumentReference, limit, updateDoc } from 'firebase/firestore';
import { AuthSessionService } from '../AuthSessionService/auth-session-service.service';
import { Volunteer } from '../../models/volunteer';
import { UserModel } from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private _volunteersCollection !: CollectionReference<Volunteer>;

  private volunteers: Volunteer[] = [];

  private _isVolunteer : boolean = false;

  constructor(private _firestore: Firestore,
    private _authService : AuthSessionService) {
    this._volunteersCollection = collection(this._firestore, 'volunteers') as CollectionReference<Volunteer>;

    
    this.getVolunteers(0);
  }

  addVolunteer(id : any, date : any) {

    this._authService.userLogged().then((uid : any) => {

      this._authService.getUserByUid(uid).then((user : UserModel) => {

        if(user.role === 'volunteer' || user.role === 'admin'){ // Seguritzar

          const volunteer : Volunteer = {
            refPet: id,
            refUser: uid,
            time: date
          }

          addDoc(this._volunteersCollection, volunteer);
        }

      });

    });
  }

  getVolunteers(add : number) {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + add);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + add, 23, 59, 59);

    const queryRef = query(
      this._volunteersCollection,
      where('time', '>=', startOfDay),
      where('time', '<=', endOfDay),
    );

    collectionData(queryRef, { 'idField': 'id' }).subscribe({
      next: (volunteers: Volunteer[]) => {
        this._authService.userLogged().then((uid : any) => {
          this._authService.getUserByUid(uid).then((user : UserModel) => {
            if(user.role === "admin" || user.role === "volunteer") // Seguritzar
              this.volunteers = volunteers;
          });
        });
      },
      error: (err) => {
      }
    });
  }

  getAllVolunteers () {
    return this.volunteers;
  }

  public returnIsVolunteer (hour : number) {
    return this.volunteers.filter((volunteer: Volunteer) => {
      const timestamp: any = volunteer.time;
      const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
      const date = new Date(milliseconds);
      return date.getHours() === hour;
    });
  }

}
