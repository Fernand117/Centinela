<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class productos extends Model
{
    public $timestamps = false;
    protected $table = "productos";
    protected $fillabel = [
        'imagen', 'nombre', 'descripcion', 'precio', 'idCategoria', 'idEmpleado'
    ];
}
