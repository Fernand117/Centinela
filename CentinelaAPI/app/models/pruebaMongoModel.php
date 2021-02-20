<?php

namespace App\models;

use MongoDB\Model\BSONDocument as MongoModel;

class pruebaMongoModel extends MongoModel
{
    protected $fillable = [
        'nombre', 'apellido', 'direccion'
    ];
}
/**Si a direccion se le pasa entre corchetes los daots, entonces guarda  un objeto */
//$cliente->direccion = ['calle' => $datos['calle'], 'ciudad' => $datos['ciudad'], 'estado' => $datos['estado']];
/**Si se le pasa doble corchete, entonce podemos almacenar varios objetos dentro de un arreglo */
//$cliente->direccion = [['calle' => $datos['calle'], 'ciudad' => $datos['ciudad'], 'estado' => $datos['estado']]];
/**Si solo le pasamos los datos separados por una coma entonce guarda un array */
//$cliente->direccion = [$datos['calle'] , $datos['ciudad'] , $datos['estado']];