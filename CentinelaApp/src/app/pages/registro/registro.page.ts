import { Component, OnInit } from '@angular/core';
import { UsuarioModule } from '../../models/usuario/usuario.module';
import { ServiceService } from '../../services/service.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuarios: UsuarioModule = new UsuarioModule();
  formData: FormData = new FormData();

  constructor(
    private apiService: ServiceService,
    private alertController: AlertController,
    private loadController: LoadingController
  ) { }

  ngOnInit() {
  }

  async alertMsg(mensaje, subHeader){
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: subHeader,
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async loadLogin(){
    const load = await this.loadController.create({
      cssClass: "my-custom-class",
      message: "Iniciando sesión",
      duration: 200
    });
    await load.present();

    this.formData.append('nombre', this.usuarios.nombre);
    this.formData.append('paterno', this.usuarios.paterno);
    this.formData.append('materno', this.usuarios.materno);
    this.formData.append('edad', this.usuarios.edad);
    this.formData.append('calle', this.usuarios.calle);
    this.formData.append('colonia', this.usuarios.colonia);
    this.formData.append('ciudad', this.usuarios.ciudad);
    this.formData.append('estado', this.usuarios.estado);
    this.formData.append('email', this.usuarios.email);
    this.formData.append('nombre_usuario', this.usuarios.usuario);
    this.formData.append('password', this.usuarios.password);
    this.formData.append('foto_perfil', 'default');

    this.apiService.registrarCuenta(this.formData).subscribe(
      respuesta => {
        this.alertMsg(respuesta['Mensaje'], 'Advertencia');
      }, error => {
        if (error['status'] == 404){
          this.alertMsg(error['error']['Mensaje'], 'Error');
        } else if (error['status'] == 500){
          this.alertMsg('Ocurrió un error con el servidor.', 'Error');
        }
      }
    );
    load.onDidDismiss();
  }

  validarFormulario(){
    this.loadLogin();
    if (this.usuarios.nombre == "" || this.usuarios.paterno == "" || this.usuarios.materno == "" ) {
      this.alertMsg("Por favor ingrese sus datos básicos.", "Error");
    }

    if (this.usuarios.calle == "" || this.usuarios.colonia == "" || this.usuarios.ciudad == "" || this.usuarios.estado == "") {
      this.alertMsg("Por favor ingrese los datos de su dirección.", "Error");
    }

    if (this.usuarios.usuario == "" || this.usuarios.email == "" || this.usuarios.password == "") {
      this.alertMsg("Por favor ingrese los datos de usuario.", "Error");
    }
  }
}
