import { Injectable, inject } from '@angular/core';
import {Storage, ref} from '@angular/fire/storage';
import { deleteObject, getDownloadURL, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private storage = inject(Storage);

  async uploadImage(image: string, userId: string) {
    const url = `users/${userId}.jpg`;
    const storageRef = ref(this.storage, url);

    const existe = await getDownloadURL(storageRef).catch(() => null);

    if(existe) {
      await deleteObject(storageRef);
    }

    const response = await fetch(image);
    const blob = await response.blob();
    await uploadBytes(storageRef, blob);

    return await getDownloadURL(storageRef)

  }
}
