<?php

namespace App\Http\Controllers;

use App\models\empleados;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmpleadosController extends Controller
{
    public function listarEmpleados(){
        $consultaEmpleados = DB::select('select * from empleados');
        if($consultaEmpleados != null){
            return response()->json(['Empleados' => $consultaEmpleados]);
        } else {
            return response()->json(['Empleados' => 'Aun no existen empleados registrados.']);
        }
    }

    public function registrarEmpleado(Request $request)
    {
        $datos = $request->all();

        $consultaEmpleados = DB::select('select * from empleados where numero_empleado = ?', [$datos['numero_empleado']]);
        if($consultaEmpleados != null){
            return response()->json(['Mensaje' => 'Este empleado ya está registrado']);
        } else {
            $empleado = new empleados();
            $empleado->numero_empleado = $datos['numero_empleado'];
            $empleado->nombre = $datos['nombre'];
            $empleado->paterno = $datos['paterno'];
            $empleado->materno = $datos['materno'];
            $empleado->edad = $datos['edad'];
            $empleado->tipo = $datos['tipo'];
            $empleado->idUsuario = $datos['idUsuario'];
            $empleado->save();
            return response()->json(['Mensaje' => 'Empleado registrado correctamente']);
        }
    }

    public function editarEmpleado(Request $request){
        $datos = $request->all();
        $id = $datos['id'];

        $consultaEmpleados = DB::select('select * from empleados where numero_empleado = ?', [$datos['numero_empleado']]);
        if($consultaEmpleados != null){
            return response()->json(['Mensaje' => 'Este número de empleado ya está registrado']);
        } else {
            $empleado = empleados::find($id);
            $empleado->numero_empleado = $datos['numero_empleado'];
            $empleado->nombre = $datos['nombre'];
            $empleado->paterno = $datos['paterno'];
            $empleado->materno = $datos['materno'];
            $empleado->edad = $datos['edad'];
            $empleado->tipo = $datos['tipo'];
            $empleado->idUsuario = $datos['idUsuario'];
            $empleado->update();
            return response()->json(['Mensaje' => 'Registro actualizado correctamente']);
        }
    }

    public function eliminarEmpleado(Request $request){
        $datos = $request->all();
        $id = $datos['id'];
        DB::delete('delete from empleados where id = ?', [$id]);
        return response()->json(['Mensaje' => 'Registro eliminado correctamente']);
    }
}
