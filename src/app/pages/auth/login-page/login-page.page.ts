import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from '../interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LoginPagePage {

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

    this.authService.login(login).then((user) => {
      this.alerta.show = true;
      this.alerta.msg = 'Inicio de sesión correcto';
      this.router.navigateByUrl('/profile-page');
      localStorage.setItem('uid', user.user.uid);
    }).catch(error => {
      console.log(error);
      this.alerta.show = true;
      this.alerta.msg = error.message ? error.message : error;
    });
  }

}
