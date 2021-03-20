<?php

namespace App\Http\Controllers;

use App\models\pedidos;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidosController extends Controller
{
    public function listarPedidosGeneral(){
        $pedidosConsulta = DB::select('select * from pedidos');
        if ($pedidosConsulta != null) {
            return response()->json(['Pedidos' => $pedidosConsulta]);
        } else {
            return response()->json(['Pedidos' => 'Aún no hay pedidos realizados']);
        }
    }

    public function listarPedidoCliente(Request $request){
        $datos = $request->all();
        $cliente = $datos['cliente'];
        $pedidosConsulta = DB::select('select * from pedidos where cliente = ?', [$cliente]);
        if ($pedidosConsulta != null) {
            return response()->json(['Pedidos' => $pedidosConsulta]);
        } else {
            return response()->json(['Pedidos' => 'Aún no tienes pedidos realizados.'], 404);
        }
    }

    public function registrarPedido(Request $request){
        $datos = $request->all();
        $consultaPedidos = DB::select('select numero_pedido from pedidos group by numero_pedido order by numero_pedido desc limit 1');
        if($consultaPedidos != null){
            $npedido = intval($consultaPedidos['0']->numero_pedido) + 1;
        } else {
            $npedido = 1;    
        }
        $pedido = new pedidos();
        $pedido->numero_pedido = $npedido;
        $pedido->cliente = $datos['cliente'];
        $pedido->fecha = new DateTime();
        $pedido->venta = $datos['venta'];
        $pedido->total = $datos['total'];
        $pedido->save();
        return response()->json(['Mensaje' => 'Pedido levantado']);
        //return response()->json();
    }

    public function eliminarPedido(Request $request){
        $datos = $request->all();
        $nPedido = $datos['numero_pedido'];
        DB::delete('delete from pedidos where numero_pedido = ?', [$nPedido]);
        $consultaPedidos = DB::select('select * from pedidos where numero_pedido = ?', [$nPedido]);
        if($consultaPedidos != null){
            return response()->json(['Mensaje' => 'El pedido no se ha eliminado correctamente.'], 404);
        } else {
            return response()->json(['Mensaje' => 'El pedido se ha eliminado correctamente.']);
        }        
    }
}
