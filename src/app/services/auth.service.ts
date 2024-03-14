import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';

import { Auth } from '@angular/fire/auth'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Login } from '../pages/auth/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private collection = collection(this.firestore, 'users');
  private isUserLogged() {
    return this.getCurrentUser();
  }

  private getCurrentUser() {
    return this.auth.currentUser;
  }

  login(login: Login) {
    if (!this.isUserLogged()) {
      return Promise.reject('Ya existe un usuario con ese correo electronico');
    }

    return signInWithEmailAndPassword(this.auth, login.email, login.password);
  }

  signUp(login: Login) {
    // if (this.isUserLogged()) {
    //   return Promise.reject('Ya existe un usuario con ese correo electronico');
    // }

    return createUserWithEmailAndPassword(this.auth, login.email, login.password);
  }

  forgotPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  createUserDoc({ nombre, email, uid }: { nombre: string, email: string, uid: string }) {
    const userRef = doc(this.collection, uid);
    return setDoc(userRef, {
      uid: uid,
      email: email,
      name: nombre,
    });
  }

}
