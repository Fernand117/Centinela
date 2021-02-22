<?php

namespace App\Http\Controllers;

use App\models\usuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuariosController extends Controller
{
    public function registrarUsuarios(Request $request)
    {
        $datos = $request->all();

        $usuario = new usuarios();

        $usuario->nombre = $datos['nombre'];
        $usuario->email = $datos['email'];
        $usuario->password = md5($datos['password']);

        $consultaUsuario = DB::select('select * from usuarios where  nombre = ?', [$datos['nombre']]);
        $itemUsuario = json_decode(json_encode($consultaUsuario), true);

        $consultaEmail = DB::select('select * from usuarios where  email = ?', [$datos['email']]);
        $itemEmail = json_decode(json_encode($consultaEmail), true);

        if ($itemUsuario != null) {
            $usuarioRespuesta = "El nombre de usuario ya existe";
            return response()->json(['Mensaje' => $usuarioRespuesta]);
        } elseif ($itemEmail != null) {
            $emailRespuesta = "El correo ya está registrado";
            return response()->json(['Mensaje' => $emailRespuesta]);
        } else {
            $usuario->save();
            $respuesta = "Usuario registrado correctamente";
            return response()->json(['Mensaje' => $respuesta]);
        }
    }

    public function login(Request $request){
        $datos = $request->all();
        $usuario = DB::select('select * from usuarios where  nombre = ? and password = ?', [$datos['nombre'], md5($datos['password'])]);
        $item = json_decode(json_encode($usuario), true);
        if ($item != null) {
            return response()->json(['Usuario' => $item]);
        } else {
            return response()->json(['Usuario' => 'Error, usuario o contraseña incorrectos']);
        }
    }

    public function listarUsuarios(){
        $usuarios = usuarios::all();
        return response()->json(['Usuarios' => $usuarios]);
    }

    public function eliminarUsuario(Request $request){
        $datos = $request->all();
        $id = $datos['id'];
        $sql = DB::delete('delete from usuarios where id = ?', [$id]);
        if($sql == 1){
            return response()->json(['Mensaje' => 'Usuarios eliminado.']);
        } else {
            return response()->json(['Mensaje' => 'El usuario que intenta eliminar no existe.']);
        }
    }
}
