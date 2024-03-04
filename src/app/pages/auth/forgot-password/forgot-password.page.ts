import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForgotPasswordPage {

  constructor(private authService: AuthService) { }

  email: string = '';

  alerta = {
    msg: '',
    show: false,
    duration: 5000,
  }

  forgotPassword() {
    this.authService.forgotPassword(this.email).then(() => {
      this.alerta.show = true;
      this.alerta.msg = 'Correo enviado correctamente';
    }).catch(err => {
      this.alerta.show = true;
      this.alerta.msg = err.message ? err.message : err ? err : 'Error...';
    });
  }

}
