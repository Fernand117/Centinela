import { Component, OnInit } from '@angular/core';
import { UsuarioModule } from '../../models/usuario/usuario.module';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  msjErrorGDatos: any;
  datosSensores: any;
  datos: any;
  usuario: any;
  status: string;
  usuarios: UsuarioModule = new UsuarioModule();

  constructor(
    private router: Router,
    private apiService: ServiceService,
    private loadController: LoadingController
  ) { }

  ngOnInit() {
    this.cargarDatos();
    this.cargarDatosGeneralSensores();
  }

  logout(){
    status = localStorage.getItem('statusCheckBox');
    if (status == "false" || status == "true"){
      this.eliminarDatos();
    }
    this.router.navigateByUrl("login");
  }

  cargarDatos(){
    this.datos = JSON.parse(localStorage.getItem('Usuario'));
    this.usuario = this.datos[0]['nombre'];
  }

  eliminarDatos(){
    localStorage.removeItem('Usuario');
    localStorage.removeItem('statusCheckBox');
  }

  async cargarDatosGeneralSensores(){
    const load = await this.loadController.create({
      cssClass: "my-custom-class",
      message: "Cargando datos de los sensores.",
      duration: 200
    });
    await load.present();

    this.apiService.listaGeneralSensores().subscribe(
      respuesta => {
        this.datosSensores = respuesta['Datos'];
        load.onDidDismiss();
      }, error => {
        if (error['status'] == 404){
          this.msjErrorGDatos = error['error']['Datos'];
          document.getElementById("cards").innerHTML = '<div class="msjError" style="margin-top:30%; padding: 16px; text-align: center; font-size: 18px; color: #263238;">' + this.msjErrorGDatos + '</div>';
          load.onDidDismiss();
        } else {
          document.getElementById("cards").innerHTML = '<div class="msjError" style="margin-top:30%; padding: 16px; text-align: center; font-size: 18px; color: #263238;"> No hay conexión con el servidor </div>';
          load.onDidDismiss();
        }
      }
    );
  }
}
