<?php

namespace App\Http\Controllers;

use App\models\SensoresMongo;
use Illuminate\Http\Request;
use MongoDB\Client as MongoDBClient;

class SensoresMongoController extends Controller
{
    public function listaDatosGeneral(){
        $conexion = new MongoDBClient();
        $db = $conexion->dbcentinela;
        $coleccion = $db->sensores;

        $consultarDatosSensores = $coleccion->find();
        $respuesta = Array();
        foreach ($consultarDatosSensores as $items) {
            array_push($respuesta, $items);
        }

        if($respuesta != null){
            return response()->json(['Datos' => $respuesta]);
        } else {
            return response()->json(['Datos' => 'Aún no hay datos registrados por los sensores.'], 404);
        }
    }

    public function listaDatosXTipoSensor(Request $request){
        $conexion = new MongoDBClient();
        $db = $conexion->dbcentinela;
        $coleccion = $db->sensores;

        $datos = $request->all();
        $tipoSensor = $datos['tipoSensor'];

        $consultaXTipoSensor = $coleccion->find(array('tipo_sensor' => $tipoSensor));
        $respuesta = Array();
        foreach ($consultaXTipoSensor as $items) {
            array_push($respuesta, $items);
        }

        if($respuesta != null){
            return response()->json(['Datos' => $respuesta]);
        } else {
            return response()->json(['Datos' => 'Aún no hay datos registrados por los sensores.'], 404);
        }
    }

    public function registrarSensorDatos(Request $request){
        setlocale(LC_TIME, 'es_ES.UTF-8');
        date_default_timezone_set("America/Mexico_City");
        $datos = $request->all();
        
        $sensor = new SensoresMongo();
        $sensor->nombre = $datos['nombre'];
        $sensor->datos = $datos['datos'];
        $sensor->tipo_sensor = $datos['tipoSensor'];
        $sensor->fecha = date('d.m.y, h:i:s A');

        $conexion = new MongoDBClient();
        $db = $conexion->dbcentinela;
        $coleccion = $db->sensores;
        $coleccion->insertOne($sensor);

        return response()->json(['Mensaje' => 'Datos enviado al servidor correctamente.']);
    }
}
