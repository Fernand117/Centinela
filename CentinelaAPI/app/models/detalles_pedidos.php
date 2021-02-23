<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class detalles_pedidos extends Model
{
    public $timestamps = false;
    protected $table = "detalles_pedidos";
    protected $fillabel = [
        'idPedido', 'idProducto', 'cantidad', 'subtotal'
    ];
}
