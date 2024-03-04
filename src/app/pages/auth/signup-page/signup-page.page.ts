import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from '../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.page.html',
  styleUrls: ['./signup-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SignupPagePage {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  alerta = {
    msg: '',
    show: false,
    duration: 5000,
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)]],
    password: ['', [Validators.required, Validators.minLength(7)]],
  });

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

    this.authService.signUp(login).then(() => {
      this.alerta.show = true;
      this.alerta.msg = 'Cuenta creada correctamente';
      this.alerta.duration = 3000;
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.log(error);
      this.alerta.show = true;
      this.alerta.msg = error.message;
      this.alerta.duration = 5000;
    });
  }

}
