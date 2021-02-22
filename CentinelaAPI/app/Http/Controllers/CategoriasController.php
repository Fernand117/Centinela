<?php

namespace App\Http\Controllers;

use App\models\categorias;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoriasController extends Controller
{
    public function listarCategorias(){
        $listaCategorias = DB::select('select * from categorias');
        if($listaCategorias != null){
            return response()->json(['Categorias' => $listaCategorias]);
        } else {
            return response()->json(['Categorias' => 'No existen categorias.']);
        }
    }

    public function registrarCategoria(Request $request){
        $datos = $request->all();

        $consulta = DB::select('select * from categorias where nombre = ?', [$datos['nombre']]);

        if($consulta != null){
            return response()->json(['Mensaje' => 'Esta categoria ya está registrada.']);
        } else {
            $categoria = new categorias();
            if(isset($datos['imagen'])){
                $extension = $request->file('imagen')->getClientOriginalExtension();
                $path = base_path().'/public/img/categorias/';
                $nombre = "imagen_".date('Y_m_d_h_i_s').".".$extension;
                $request->file("imagen")->move($path, $nombre);
                $categoria->imagen = $nombre;
            }
            $categoria->nombre = $datos['nombre'];
            $categoria->save();
            return response()->json(['Mensaje' => 'Categoria registrada correctamente.']);
        }
    }

    public function editarCategoria(Request $request){
        $datos = $request->all();
        $id = $datos['id'];
        $categoria = categorias::find($id);

        if(isset($datos['imagen'])){
            $extension = $request->file('imagen')->getClientOriginalExtension();
            $path = base_path().'/public/img/categorias/';
            $nombre = "imagen_".date('Y_m_d_h_i_s').".".$extension;
            $request->file("imagen")->move($path, $nombre);
            $categoria->imagen = $nombre;
        }
        $categoria->nombre = $datos['nombre'];
        $categoria->update();
        return response()->json(['Mensaje' => 'Categoria editada correctamente.']);
    }

    public function eliminarCategoria(Request $request){
        $datos = $request->all();
        $id = $datos['id'];
        DB::delete('delete categorias where id = ?', [$id]);
        return response()->json(['Mensaje' => 'Categoria eliminado correctamente.']);
    }
}
