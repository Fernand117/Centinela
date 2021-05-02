<?php

namespace App\Http\Controllers;

use App\models\ClienteMongo;
use Illuminate\Http\Request;
use MongoDB\Client as MongoDBClient;

class ClienteMongoController extends Controller
{
    public function registrarCliente(Request $request){
        $datos = $request->all();

        $cliente = new ClienteMongo();

        $cliente->nombre = $datos['nombre'];
        $cliente->paterno = $datos['paterno'];
        $cliente->materno = $datos['materno'];
        $cliente->edad = $datos['edad'];
        $cliente->direccion = ['calle' => $datos['calle'],'colonia' => $datos['colonia'] ,'ciudad' => $datos['ciudad'], 'estado' => $datos['estado']];
        $cliente->usuario = ['nombre' => $datos['nombre_usuario'], 'email' => $datos['email'], 'password' => md5($datos['password'])];
        $cliente->foto_perfil = $datos['foto_perfil'];

        $conexion = new MongoDBClient();
        $db = $conexion->dbcentinela;
        $coleccion =  $db->clientes;

        $consultaCiente = $coleccion->find(array('usuario.nombre' => $datos['nombre_usuario'], 'usuario.email' => $datos['email']));
        $respuesta = Array();
        foreach ($consultaCiente as $items) {
            array_push($respuesta, $items);
        }

        if($respuesta != null){
            return response()->json(['Mensaje' => 'Error, el usuario ya existe'], 404);
        } else {
            $coleccion->insertOne($cliente);
            $consultarCliente = $coleccion->find();
            $respuesta = Array();
            foreach ($consultarCliente as $items) {
                array_push($respuesta, $items);
            }
            return response()->json(['Mensaje' => 'Cuenta creada correctamente.']);
        }
    }

    public function login(Request $request){
        $datos = $request->all();

        $conexion = new MongoDBClient();
        $db = $conexion->dbcentinela;
        $coleccion =  $db->clientes;
        $consultaCiente = $coleccion->find(array('usuario.nombre' => $datos['nombre'], 'usuario.password' => md5($datos['password'])));
        $respuesta = Array();
        foreach ($consultaCiente as $items) {
            array_push($respuesta, $items);
        }

        if($respuesta != null){
            return response()->json(['Datos' => $respuesta]);
        } else {
            return response()->json(['Datos' => 'Usuario o contraseña incorrectos.'], 404);
        }
    }

    public function listaClientes(){
	    $conexion = new MongoDBClient();
	    $db = $conexion->dbcentinela;
	    $consulta = $db->clientes->find();
	    $respuesta = Array();
	    foreach($consulta as $item){
		    array_push($respuesta, $item);
	    }
	    return response()->json(['Clientes' => $respuesta]);
    }
}
