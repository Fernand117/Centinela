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

Route::post('registrar/usuarios', 'UsuariosController@registrarUsuarios');
Route::post('login/usuarios', 'UsuariosController@login');
Route::get('lista/usuarios', 'UsuariosController@listarUsuarios');
Route::post('eliminar/usuarios', 'UsuariosController@eliminarUsuario');

Route::post('crear/cliente', 'ClienteMongoController@registrarCliente');
Route::post('login/cliente', 'ClienteMongoController@login');