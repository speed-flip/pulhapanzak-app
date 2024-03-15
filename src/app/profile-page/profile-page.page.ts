import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

import {Camera, CameraResultType} from '@capacitor/camera';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProfilePagePage implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService,
              private profileService: ProfileService) { }

  fechaMax = new Date();
  imageSrc = '';

  profileForm = this.fb.group({
    nombre: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.pattern('[0-9]{13}')]],
    celular: ['', [Validators.required, Validators.pattern('[0-9]{8,}')]],
    fechanac: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.fechaMax = new Date();
    this.authService.getUser(localStorage.getItem('uid') ?? '')
      .then(user => {
        this.profileForm.controls.nombre.setValue(user.get('name') ? user.get('name') : user.get('nombre'));
        this.profileForm.controls.dni.setValue(user.get('dni') ?? '');
        this.profileForm.controls.celular.setValue(user.get('celular') ?? '');
        this.imageSrc = user.get('photoUrl') ?? 'assets/img/logoapp.png';
      });
  }

  async onPickImage() {
    const camera = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      promptLabelHeader: 'Seleccionar una opción',
      promptLabelPicture: 'Tomar una foto',
      promptLabelPhoto: 'Elegir de galería',
    });
    if (!camera) return;
    this.imageSrc = camera.webPath ?? camera.path ?? '';
    // console.log(this.imageSrc);

    const imageUrl = await this.profileService.uploadImage(this.imageSrc, localStorage.getItem('uid')!);

    this.imageSrc = imageUrl;
  }

  saveUser() {
    this.authService.updateUser({
      nombre: this.profileForm.value.nombre!,
      dni: this.profileForm.value.dni!,
      celular: this.profileForm.value.celular!,
      fecha: this.profileForm.value.fechanac!,
      photoUrl: this.imageSrc,
      uid: localStorage.getItem('uid') ?? ''
    }).then(user => console.log(user))
      .catch(user => console.log(user));
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
  }

}
