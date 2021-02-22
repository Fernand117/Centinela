<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class direccion extends Model
{
    public $timestamps = false;
    protected $table = "direccion";
    protected $fillabel = [
        'direccion', 'ciudad', 'estado', 'idEmpleado'
    ];
}
