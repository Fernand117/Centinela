<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class tipo_empleados extends Model
{
    public $timestamps = false;
    protected $table = "tipo_empleados";
    protected $fillabel = [
        'tipo'
    ];
}
