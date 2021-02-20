<?php

namespace App\models;

use MongoDB\Model\BSONDocument as MongoModel;


class ClienteMongo extends MongoModel
{
    protected $fillable = [
        'nombre','paterno','materno','edad','direccion','usuario','foto_perfil'
    ];
}
