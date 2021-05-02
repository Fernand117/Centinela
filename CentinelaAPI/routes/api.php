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

Route::get('lista/tipoempleado', 'TipoEmpleadosController@listarTipoEmpleados');
Route::post('registrar/tipoempleado', 'TipoEmpleadosController@registrarTipoEmpleado');
Route::post('editar/tipoempleado', 'TipoEmpleadosController@editarTipoEmpleado');
Route::post('eliminar/tipoempleado', 'TipoEmpleadosController@eliminarTipoEmpleado');

Route::get('lista/empleados', 'EmpleadosController@listarEmpleados');
Route::post('registrar/empleado', 'EmpleadosController@registrarEmpleado');
Route::post('editar/empleado', 'EmpleadosController@editarEmpleado');
Route::post('eliminar/empleado', 'EmpleadosController@eliminarEmpleado');

Route::get('lista/direcciones', 'DireccionController@listarDirecciones');
Route::post('registrar/direccion', 'DireccionController@registrarDireccion');
Route::post('editar/direccion', 'DireccionController@editarDireccion');
Route::post('eliminar/direccion', 'DireccionController@eliminarDireccion');

Route::get('lista/categorias', 'CategoriasController@listarCategorias');
Route::post('registrar/categoria', 'CategoriasController@registrarCategoria');
Route::post('editar/categoria', 'CategoriasController@editarCategoria');
Route::post('eliminar/categoria', 'CategoriasController@eliminarCategoria');

Route::get('lista/productos', 'ProductosController@listarProductos');
Route::post('lista/productos-categorias', 'ProductosController@listarProductosXCategoria');
Route::post('lista/producto-detalle', 'ProductosController@listaProductoDetalle');
Route::post('registrar/producto', 'ProductosController@registrarProducto');
Route::post('editar/producto', 'ProductosController@editarProducto');
Route::post('eliminar/producto', 'ProductosController@eliminarProducto');

Route::get('lista/pedidos', 'PedidosController@listarPedidosGeneral');
Route::post('lista/pedidos/cliente', 'PedidosController@listarPedidoCliente');
Route::post('registrar/pedido', 'PedidosController@registrarPedido');
Route::post('eliminar/pedido', 'PedidosController@eliminarPedido');
Route::post('lista/detalles', 'DetallesPedidosController@listarDetallePedido');
Route::post('registrar/detalle', 'DetallesPedidosController@registrarDetallePedido');
Route::post('eliminar/detalle', 'DetallesPedidosController@eliminarDetalleProducto');

/**RUTAS PARA CONSUMO DE LA APLICACIÓN CON CONEXIÓN A MONGODB */
Route::post('crear/cliente', 'ClienteMongoController@registrarCliente');
Route::post('login/cliente', 'ClienteMongoController@login');
Route::get('lista/clientes', 'ClienteMongoController@listaClientes');

Route::get('lista/general-sensores', 'SensoresMongoController@listaDatosGeneral');
Route::post('lista/datos-tipo-sensores', 'SensoresMongoController@listaDatosXTipoSensor');
Route::post('registrar/datos-sensores', 'SensoresMongoController@registrarSensorDatos');
