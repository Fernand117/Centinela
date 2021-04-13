import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UsuarioModule } from '../../models/usuario/usuario.module';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarios: UsuarioModule = new UsuarioModule();
  formData: FormData = new FormData();
  status: string;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private apiservice: ServiceService,
    private router: Router
  ) { }

  async ngOnInit() {
    status = localStorage.getItem('statusCheckBox');
    if (status === 'true'){
      this.router.navigateByUrl('inicio');
    }
  }

  stateCheck(){
    console.log(this.usuarios.statusChekBox);
  }

  async alertMsg(sheader, mensaje){
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'ERROR: ' + sheader + ' NO ENCONTRADO',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async loadLogin(){
    const load = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Iniciando sesión',
      duration: 2000
    });
    await load.present();

    this.formData.append('nombre', this.usuarios.usuario);
    this.formData.append('password', this.usuarios.password);

    this.apiservice.login(this.formData).subscribe(
      respuesta => {
        this.guardarDatos(respuesta['Datos']);
      }, err => {
        if (err['status'] === 404){
          this.alertMsg(err['status'], err['error']['Datos']);
        } else {
          this.alertMsg('Error', 'Ocurrió un eror en el servidor, servicio no disponible.');
        }
      }
    );

    load.onDidDismiss();
  }

  validarFormulario(form){
    if (this.usuarios.usuario === '' || this.usuarios.password === '') {
      this.alertMsg('Ocurrió un error', 'Por favor, rellene todos los campos solicitados.');
    } else {
      this.loadLogin();
    }
  }

  guardarDatos(datos){
    localStorage.setItem('statusCheckBox', String(this.usuarios.statusChekBox));
    localStorage.setItem('Usuario', JSON.stringify(datos));
    this.router.navigateByUrl('inicio');
  }
}
