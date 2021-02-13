import { Component, OnInit } from '@angular/core';
import { UsuarioModule } from '../../models/usuario/usuario.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  status: String;
  usuarios: UsuarioModule = new UsuarioModule();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  logout(){
    status = localStorage.getItem('statusCheckBox');
    if (status == "false"){
      console.log(status);
      this.eliminarDatos();
    }
    this.router.navigateByUrl("login");
  }

  cargarDatos(){
    this.usuarios.email = localStorage.getItem('email');
  }

  eliminarDatos(){
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('statusCheckBox');
  }
}
