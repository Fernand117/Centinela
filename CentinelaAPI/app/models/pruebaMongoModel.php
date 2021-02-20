<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use MongoDB\Model\BSONDocument as MongoModel;

class pruebaMongoModel extends MongoModel
{
    protected $fillable = [
        'nombre', 'apellido'
    ];
}
