<?php

namespace App\Http\Controllers;

use App\models\pruebaMongoModel;
use Illuminate\Http\Request;
use MongoDB\Client as MongoDBClient;
use Mongodb\Model\BSONDocument;
class PruebMongo extends Controller
{
    public function guardarCliente(Request $request){
        $datos = $request->all();
        $cliente = new pruebaMongoModel();
        $cliente->nombre = $datos['nombre'];
        $cliente->apellido = $datos['apellido'];
        $conn = new MongoDBClient();
        $db = $conn->dbprueba;
        $collection = $db->clientes;
        $collection->insertOne($cliente);
        $consulta = $collection->find();
        $result = Array();
        foreach($consulta as  $items){
            array_push($result, $items);
        }
        return response()->json(['Clientes' => $result]);
    }
}
