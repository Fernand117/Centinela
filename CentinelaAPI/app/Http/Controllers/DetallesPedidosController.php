<?php

namespace App\Http\Controllers;

use App\models\detalles_pedidos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DetallesPedidosController extends Controller
{
    public function listarDetallePedido(Request $request){
        $datos = $request->all();
        $idPedido = $datos['idPedido'];
        $consultarDetallesPedido = DB::select('select * from detalles_pedidos where idPedido = ?', [$idPedido]);
        if ($consultarDetallesPedido != null) {
            return response()->json(['Detalles' => $consultarDetallesPedido]);
        } else {
            return response()->json(['Detalles' => 'Aún no se han añadido productos'], 404);
        }
    }

    public function registrarDetallePedido(Request $request){
        $datos = $request->all();
        $cliente = $datos['cliente'];
        $consultarIDPedido = DB::select('select id from pedidos where cliente = ? group by numero_pedido order by numero_pedido desc limit 1', [$cliente]);
        if($consultarIDPedido != null){
            $npedido = $consultarIDPedido['0']->id;
        } else {
            $npedido = 1;
        }
        $detallePedido = new detalles_pedidos();
        $id = random_int(1, 1000);
        $detallePedido->id = $id;
        $detallePedido->idPedido = $npedido;
        $detallePedido->idProducto = $datos['idProducto'];
        $detallePedido->cantidad = $datos['cantidad'];
        $detallePedido->subtotal = $datos['subtotal'];
        $detallePedido->save();
        return response()->json(['Mensaje' => 'Producto añadido.']);
    }

    public function eliminarDetalleProducto(Request $request){
        $datos = $request->all();
        $idDPedido = $datos['id'];
        DB::delete('delete detalles_pedidos where id = ?', [$idDPedido]);
        return response()->json(['Mensaje' => 'Producto eliminado de su pedido']);
    }
}
