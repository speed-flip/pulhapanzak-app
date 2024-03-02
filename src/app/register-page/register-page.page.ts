import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPagePage {

  constructor(private fb: FormBuilder) { }

  registerForm = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    dni: ['', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
    celular: ['', [Validators.required, Validators.pattern(/^[0-9]{8,}$/)]]
  });

  // Getters para acceder a los errores de cada campo
  get firstNameError() {
    // console.log(this.registerForm.get('nombres'))
    const nombres = this.registerForm.get('nombres');
    if (nombres?.touched) {
      return nombres!.hasError('required') ? 'Nombres obligatorio' : '';
    }
    return '';
  }

  get lastNameError() {
    const apellidos = this.registerForm.get('apellidos');
    if (apellidos?.touched) {
      return apellidos!.hasError('required') ? 'Apellidos obligatorios' : '';
    }

    return '';
  }

  get emailError() {
    const email = this.registerForm.get('email');
    if (email?.touched) {
      return email!.hasError('required') ? 'Correo electronico obligatorio' :
        email!.hasError('email') ? 'Formato no valido' :
          '';
    }

    return '';
  }

  get passwordError() {
    const password = this.registerForm.get('password');
    if (password?.touched) {
      return password!.hasError('required') ? 'Contraseña obligatorio' :
        password!.hasError('minlength') ? 'La contraseña debe de ser al menos de 6 caracteres' :
          '';
    }

    return '';
  }

  get DNIError() {
    const dni = this.registerForm.get('dni');
    if (dni?.touched) {
      return dni!.hasError('required') ? 'DNI Obligatorio' :
        dni!.hasError('pattern') ? 'DNI debe de tener al menos 13 digitos y solo numeros' :
          '';
    }

    return '';
  }

  get phoneNumberError() {
    const celular = this.registerForm.get('celular');
    if (celular?.touched && celular.errors) {
      return celular!.hasError('required') ? 'Numero de celular obligatorio' :
        celular!.hasError('pattern') ? 'Numero de celuar debe de tener al menos 8 caracteres' :
          '';
    }
    return '';

  }

}
