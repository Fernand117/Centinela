<?php

namespace App\Http\Controllers;

use App\models\productos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductosController extends Controller
{
    public function listarProductos(){
        $consultarProductos = DB::select('select * from productos');
        if($consultarProductos != null){
            return response()->json(['Productos' => $consultarProductos]);
        } else {
            return response()->json(['Productos' => 'Aún no hay productos registrados.']);
        }
    }

    public function registrarProducto(Request $request){
        $datos = $request->all();
        $consultarProducto = DB::select('select * from productos where nombre = ?', [$datos['nombre']]);
        if ($consultarProducto != null) {
            return response()->json(['Mensaje' => 'Este producto ya a sido registrado.']);
        } else {
            $producto = new productos();
            if(isset($datos['imagen'])){
                $extension = $request->file('imagen')->getClientOriginalExtension();
                $path = base_path().'/public/img/productos/';
                $nombre = "imagen_".date('Y_m_d_h_i_s').".".$extension;
                $request->file("imagen")->move($path, $nombre);
                $producto->imagen = $nombre;
            }
            $producto->nombre = $datos['nombre'];
            $producto->descripcion = $datos['descripcion'];
            $producto->precio = $datos['precio'];
            $producto->idCategoria = $datos['idCategoria'];
            $producto->idEmpleado = $datos['idEmpleado'];
            $producto->save();
            return response()->json(['Mensaje' => 'Producto registrado correctamente.']);
        }
    }

    public function editarProducto(Request $request){
        $datos = $request->all();
        $id = $datos['id'];
        $producto = productos::find($id);
        if(isset($datos['imagen'])){
            $extension = $request->file('imagen')->getClientOriginalExtension();
            $path = base_path().'/public/img/productos/';
            $nombre = "imagen_".date('Y_m_d_h_i_s').".".$extension;
            $request->file("imagen")->move($path, $nombre);
            $producto->imagen = $nombre;
        }
        $producto->nombre = $datos['nombre'];
        $producto->descripcion = $datos['descripcion'];
        $producto->precio = $datos['precio'];
        $producto->idCategoria = $datos['idCategoria'];
        $producto->idEmpleado = $datos['idEmpleado'];
        $producto->update();
        return response()->json(['Mensaje' => 'Producto actualizado correctamente.']);
    }

    public function eliminarProducto(Request $request){
        $datos = $request->all();
        $id = $datos['id'];
        DB::delete('delete from productos where id = ?', [$id]);
        return response()->json(['Mensaje' => 'Producto eliminado']);
    }
}
