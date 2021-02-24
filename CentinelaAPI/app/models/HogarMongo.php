<?php

namespace App\models;

use MongoDB\Model\BSONDocument as MongoModel;

class HogarMongo extends MongoModel
{
    protected $fillable = [
        'usuario_id', 'direccion', 'estado_alerta', 'numero_hab'
    ];
}
