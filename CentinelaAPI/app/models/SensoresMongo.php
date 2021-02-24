<?php

namespace App\models;

use MongoDB\Model\BSONDocument as MongoModel;

class SensoresMongo extends MongoModel
{
    protected $fillable = [
        'nombre', 'datos', 'tipo_sensor', 'fecha'
    ];
}
