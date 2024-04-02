import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  DocumentReference,
  limit,
  query,
  where,
  Query,
  doc,
  setDoc,
  updateDoc,
  CollectionReference,
} from 'firebase/firestore';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthSessionService {
  private _usersCollection!: CollectionReference<UserModel>;
  private role!: string;

  constructor(
    private _auth: Auth,
    private _router: Router,
    private _firestore: Firestore
  ) {
    this._usersCollection = collection(
      this._firestore,
      'users'
    ) as CollectionReference<UserModel>;

    this.userLogged().then((uid: any) => {
      if (uid) {
        this.getUserByUid(uid).then((user: UserModel) => {
          this.role = user.role;
        });
      }
    });

    this.checkUserAdmin();
  }

  getUserByUid(uid: string): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      const queryRef = query(
        this._usersCollection,
        where('uid', '==', uid),
        limit(1)
      );

      collectionData(queryRef, { idField: 'id' }).subscribe({
        next: (users: UserModel[]) => {
          resolve(users[0]);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  signInWithGoogle() {
    signInWithPopup(this._auth, new GoogleAuthProvider()).then(
      (userCredential: UserCredential) => {
        this.getUserByUid(this._auth.currentUser?.uid!).then(
          (user: UserModel) => {
            if (!user) {
              this.registerInfo(
                this._auth.currentUser?.displayName!,
                'google no surnames',
                this._auth.currentUser?.email!
              );
              this._router.navigate(['/home']);
              this.checkUserAdmin();
            } else {
              this._router.navigate(['/home']);
            }
          }
        );
      }
    );
  }

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(
        this._auth,
        email,
        password
      );

      if (result) {
        if(this._auth.currentUser?.emailVerified){
          this.checkUserAdmin();
        }else{
          sendEmailVerification(result.user);
          this._auth.signOut().then(() => {
            alert("Usuari no verificat, hem tornat a enviar un gmail de verificacio");
            this._router.navigate(['/signIn']);
          });
        }
        
        this._router.navigate(['/home']);
      } else {
        this._router.navigate(['/signIn']);
      }
    } catch (err) {
      this._router.navigate(['/signIn']);
    }
  }

  checkUserAdmin() {
    this.userLogged()
      .then((uid: any) => {
        if (uid) {
          const queryRef = query(
            this._usersCollection,
            where('uid', '==', uid),
            limit(1)
          );

          collectionData(queryRef, { idField: 'id' }).subscribe((user) => {
            if (user) {
              this.role = user[0].role;
            } else {
              this._router.navigate(['/signIn']);
            }
          });
        } else {
          this._router.navigate(['/signIn']);
        }
      })
      .catch(() => this._router.navigate(['/signIn']));
  }

  getCheckUserAdmin() {
    return this.role !== 'volunteer' && this.role !== '' && this.role;
  }

  userLogged() {
    return new Promise((resolve, reject) => {
      this._auth.onAuthStateChanged((user) => {
        resolve(user?.uid);
      });
    });
  }

  logout() {
    this._auth.signOut().then(() => {
      this._router.navigate(['/home']);
      this.checkUserAdmin();
    });
  }

  async createAccount(
    name: string,
    surnames: string,
    email: string,
    password: string
  ) {
    try {
      const result = await createUserWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      if (result) {
        this._auth.signOut().then(() => {
          this._router.navigate(['/signIn']);
          sendEmailVerification(result.user);
          this.registerInfo(name, surnames, email);
        });
      } else {
        alert('Error al crear el compte intente un altre correu');
      }
    } catch (err) {
      alert('Error al crear el compte intente un altre correu');
    }
  }

  registerInfo(name: string, surnames: string, email: string) {
    const uid = this._auth.currentUser?.uid!;

    if (uid) {
      const user: UserModel = {
        uid: uid,
        name: name,
        surnames: surnames,
        email: email,
        role: 'volunteer',
      };
      addDoc(this._usersCollection, user)
        .then(() => {
          this._router.navigate(['/signIn']);
        })
        .catch(() => {
          this._router.navigate(['/home']);
        });
    }
  }

  isUserVerified () {
    return this._auth.currentUser?.emailVerified;
  }

}
