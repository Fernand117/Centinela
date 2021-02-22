<?php

namespace App\Http\Controllers;

use App\models\tipo_empleados;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TipoEmpleadosController extends Controller
{
    public function listarTipoEmpleados(){
        $listaTipoEmpleados = DB::select('select * from tipo_empleados');
        if($listaTipoEmpleados != null){
            return response()->json(['Tipos' => $listaTipoEmpleados]);
        } else {
            return response()->json(['Tipos' => 'No hay tipos de empleados registrados actualmente']);
        }
    }

    public function registrarTipoEmpleado(Request $request){
        $datos = $request->all();
        
        $consutlaTipoEmpleado = DB::select('select * from tipo_empleados where tipo = ?', [$datos['tipo']]);

        if($consutlaTipoEmpleado != null){
            return response()->json(['Mensaje' => 'Este tipo de empleado ya existe']);
        } else {
            $tipoEmpleado = new tipo_empleados();
            $tipoEmpleado->tipo = $datos['tipo'];
            $tipoEmpleado->save();
            return response()->json(['Mensaje' => 'Tipo de empleado registrado correctamente']);
        }
    }

    public function editarTipoEmpleado(Request $request)
    {
        $datos = $request->all();
        $id = $datos['id'];
        $tipoEmpleado = tipo_empleados::find($id);
        $tipoEmpleado->tipo = $datos['tipo'];
        $tipoEmpleado->update();
        return response()->json(['Mensaje' => 'Registro actualizado correctamente']);
    }

    public function eliminarTipoEmpleado(Request $request){
        $datos = $request->all();
        $id = $datos['id'];
        DB::delete('delete from tipo_empleados where id = ?', [$id]);
        return response()->json(['Mensaje' => 'Registro eliminado correctamente']);
    }
}
