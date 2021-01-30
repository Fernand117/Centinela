import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UsuarioModule } from '../../models/usuario/usuario.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarios: UsuarioModule = new UsuarioModule();

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async alertMsg(sheader, mensaje){
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: sheader,
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async loadLogin(){
    const load = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Iniciando sesión",
      duration: 2000
    });
    await load.present();
    load.onDidDismiss();
  }

  validarFormulario(form){
    if (this.usuarios.email == "" || this.usuarios.password == "") {
      this.alertMsg("Ocurrió un error", "Por favor, rellene todos los campos solicitados.");
    } else {
      console.log(this.usuarios.email, this.usuarios.password);
      this.loadLogin();
      this.router.navigateByUrl("inicio");
    }
  }
}
