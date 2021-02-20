<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class usuarios extends Model
{
    public $timestamps = false;
    protected $table = "usuarios";
    protected $fillabel = [
        'nombre', 'email', 'password'
    ];
}
