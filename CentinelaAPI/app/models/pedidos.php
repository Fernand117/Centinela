<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class pedidos extends Model
{
    public $timestamps = false;
    protected $table = "pedidos";
    protected $fillabel = [
        'numero_pedido', 'cliente', 'fecha', 'venta', 'total'
    ];
}
