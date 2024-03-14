import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from '../interface';
import { Router, RouterModule } from '@angular/router';
import { IonRouterLink } from '@ionic/angular/standalone';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.page.html',
  styleUrls: ['./signup-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class SignupPagePage {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  alerta = {
    msg: '',
    show: false,
    duration: 5000,
  }

  loginForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)]],
    password: ['', [Validators.required, Validators.minLength(7)]],
  });

  get errorNombre(): string {
    return this.loginForm.get('nombre')?.errors ? 'Ingrese su nombre' : '';
  }

  get emailError() {
    const email = this.loginForm.get('email');
    return email!.hasError('required') ? 'Ingrese su correo electronico' :
      email!.hasError('pattern') ? 'Formato de correo no valido' :
        '';
  }

  get passwordError() {
    const password = this.loginForm.get('password');
    return password!.hasError('required') ? 'Ingrese su contraseña' :
      password!.hasError('minlength') ? 'Las contraseñas deben de tener al menos seis caracteres' :
        '';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.alerta.show = true;
      this.alerta.msg = 'Ingresa tu correo y contraseña';
      return;
    }

    const login: Login = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    }

    // console.log(login);
    
    this.authService.signUp(login).then((user) => {
      this.alerta.show = true;
      this.alerta.msg = 'Cuenta creada correctamente';
      this.alerta.duration = 3000;
      this.router.navigateByUrl('/login');
      this.authService.createUserDoc({ nombre: this.loginForm.value.nombre!, email: login.email!, uid: user.user.uid })
        .then(resul => console.log(resul))
        .catch(err => console.log(err));
    }).catch(error => {
      console.log(error);
      this.alerta.show = true;
      this.alerta.msg = error.message;
      this.alerta.duration = 5000;
    });

  }

}
