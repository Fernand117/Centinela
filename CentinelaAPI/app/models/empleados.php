<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class empleados extends Model
{
    public $timestamps = false;
    protected $table = "empleados";
    protected $fillabel = [
        'numero_empleado', 'nombre', 'paterno', 'materno', 'edad', 'tipo', 'idUsuario'
    ];
}
