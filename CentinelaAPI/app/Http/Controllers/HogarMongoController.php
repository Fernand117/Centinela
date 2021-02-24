<?php

namespace App\Http\Controllers;

use App\models\HogarMongo;
use Illuminate\Http\Request;
use MongoDB\Client as MongoDBClient;

class HogarMongoController extends Controller
{
    public function registrarHogar(Request $request){
        $datos = $request->all();

        $hogar = new HogarMongo();
        $hogar->usuario_id = $datos['usuarioID'];
        $hogar->direccion = ['n_ext'=> $datos['n_ext'],'calle' => $datos['calle'],'colonia' => $datos['colonia'] ,'ciudad' => $datos['ciudad'], 'estado' => $datos['estado']];
        $hogar->estado_alerta = $datos['estadoAlerta'];
        $hogar->numero_hab = $datos['n_hab'];

        $conexion = new MongoDBClient();
        $db = $conexion->dbcentinela;
        $coleccion = $db->hogar;

        $consultarHogar = $coleccion->find(array('hogar.n_ext' => $datos['n_ext']));
        $respuesta = Array();
        foreach($consultarHogar as $item){
            array_push($respuesta, $item);
        }

        if($respuesta != null){
            return response()->json(['Mensaje' => 'Este hogar ya está siendo ocupado por otro usuario.']);
        } else {
            $coleccion->insertOne($hogar);
            return response()->json(['Mensaje' => 'Hogar registrado.']);
        }
    }
}
