<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**RUTAS PARA EL CONSUMO DEL PANEL DE ADMINISTRACIÓN CON CONEXIÓN A MYSQL */
Route::post('registrar/usuarios', 'UsuariosController@registrarUsuarios');
Route::post('login/usuarios', 'UsuariosController@login');
Route::get('lista/usuarios', 'UsuariosController@listarUsuarios');
Route::post('eliminar/usuarios', 'UsuariosController@eliminarUsuario');

Route::get('lista/categorias', 'CategoriasController@listarCategorias');
Route::post('registrar/categoria', 'CategoriasController@registrarCategoria');
Route::post('editar/categoria', 'CategoriasController@editarCategoria');
Route::post('eliminar/categoria', 'CategoriasController@eliminarCategoria');

/**RUTAS PARA CONSUMO DE LA APLICACIÓN CON CONEXIÓN A MONGODB */
Route::post('crear/cliente', 'ClienteMongoController@registrarCliente');
Route::post('login/cliente', 'ClienteMongoController@login');