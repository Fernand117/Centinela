import { Component, OnInit } from '@angular/core';
import { UsuarioModule } from '../../models/usuario/usuario.module';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';

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
  status: String;
  usuarios: UsuarioModule = new UsuarioModule();

  constructor(
    private router: Router,
    private apiService: ServiceService
  ) { }

  ngOnInit() {
    this.cargarDatos();
    this.cargarDatosGeneralSensores();
  }

  logout(){
    status = localStorage.getItem('statusCheckBox');
    if (status == "false"){
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
  }

  cargarDatosGeneralSensores(){
    this.apiService.listaGeneralSensores().subscribe(
      respuesta => {
        console.log(respuesta['Datos']);
        this.datosSensores = respuesta['Datos'];
      }, error => {
        if (error['status'] == 404){
          this.msjErrorGDatos = error['error']['Datos'];
          document.getElementById("cards").innerHTML = '<div class="msjError" style="margin-top:50%; padding: 16px; text-align: center; font-size: 18px; color: #263238;">' + this.msjErrorGDatos + '</div>';
        }
      }
    );
  }
}
