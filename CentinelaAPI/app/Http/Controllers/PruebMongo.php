<?php

namespace App\Http\Controllers;

use App\models\pruebaMongoModel;
use Illuminate\Http\Request;
use MongoDB\Client as MongoDBClient;
class PruebMongo extends Controller
{
    public function guardarCliente(Request $request){
        $datos = $request->all();
        $cliente = new pruebaMongoModel();
        $cliente->nombre = $datos['nombre'];
        $cliente->apellido = $datos['apellido'];
        /**Si a direccion se le pasa entre corchetes los daots, entonces guarda  un objeto */
        $cliente->direccion = ['calle' => $datos['calle'], 'ciudad' => $datos['ciudad'], 'estado' => $datos['estado']];
        /**Si se le pasa doble corchete, entonce podemos almacenar varios objetos dentro de un arreglo */
        //$cliente->direccion = [['calle' => $datos['calle'], 'ciudad' => $datos['ciudad'], 'estado' => $datos['estado']]];
        /**Si solo le pasamos los datos separados por una coma entonce guarda un array */
        //$cliente->direccion = [$datos['calle'] , $datos['ciudad'] , $datos['estado']];
        $conn = new MongoDBClient();
        $db = $conn->dbprueba;
        $collection = $db->clientes;
        $collection->insertOne($cliente);
        $consulta = $collection->find();
        $result = Array();
        foreach($consulta as  $items){
            array_push($result, $items);
        }
        /**De esta manera accedemos a un field en especial */
        //return response()->json(['Clientes' => $result[9]['direccion']['calle']]);
        return response()->json(['Clientes' => $result]);
    }
}
