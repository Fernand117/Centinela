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
            return response()->json(['Pedidos' => 'Aún no tienes pedidos realizados.']);
        }
    }

    public function registrarPedido(Request $request){
        $datos = $request->all();
        $consultaPedidos = DB::select('select numero_pedido from pedidos grup by numero_pedido ASC limit 1');
        if($consultaPedidos != null){
            $npedido = intval($consultaPedidos) + 1;
            
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
    }
}
