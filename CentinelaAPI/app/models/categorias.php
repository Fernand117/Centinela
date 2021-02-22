<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class categorias extends Model
{
    public $timestamps = false;
    protected $table = "categorias";
    protected $fillabel = [
        'imagen', 'nombre'
    ];
}
