<?php

namespace App\Http\Controllers;

use App\models\direccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DireccionController extends Controller
{
    public function listarDirecciones(){
        $direcciones = DB::select('select * from direccion');
        if($direcciones != null){
            return response()->json(['Direcciones' => $direcciones]);
        } else {
            return response()->json(['Direcciones' => 'Aun no hay direcciones registradas']);
        }
    }

    public function registrarDireccion(Request $request){
        $datos = $request->all();
        $direccion = new direccion();
        $direccion->direccion = $datos['direccion'];
        $direccion->ciudad = $datos['ciudad'];
        $direccion->estado = $datos['estado'];
        $direccion->idEmpleado = $datos['idEmpleado'];
        $direccion->save();
        return response()->json(['Mensaje' => 'Dirección registrada correctamente']);
    }
}
