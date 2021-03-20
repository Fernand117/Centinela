create database centinelaDB;

use centinelaDB;

create table usuarios(
    id int primary key auto_increment,
    nombre varchar(150),
    email varchar(255),
    password varchar(255)
);

create table tipo_empleados(
    id int primary key auto_increment,
    tipo varchar(60)
);

create table empleados(
    id int primary key auto_increment,
    numero_empleado varchar(255),
    nombre varchar(50),
    paterno varchar(50),
    materno varchar(50),
    edad varchar(2),
    tipo int,
    idUsuario int,
    foreign key(tipo) references tipo_empleados(id),
    foreign key(idUsuario) references usuarios(id)
);

create table direccion(
    id int primary key auto_increment,
    direccion varchar(255),
    ciudad varchar(255),
    estado varchar(255),
    idEmpleado int,
    foreign key (idEmpleado) references empleados(id)
);

create table categorias(
    id int primary key auto_increment,
    imagen varchar(255),
    nombre varchar(255)
);

create table productos(
    id int primary key auto_increment,
    imagen varchar(255),
    nombre varchar(150),
    descripcion varchar(255),
    precio float,
    idCategoria int,
    idEmpleado int,
    foreign key (idCategoria) references categorias(id),
    foreign key (idEmpleado) references empleados(id)
);

create table pedidos(
    id int primary key auto_increment,
    numero_pedido varchar(255) UNIQUE NOT NULL,
    cliente varchar(255),
    fecha timestamp,
    venta varchar(255),
    total float
);

select  * from pedidos;

create table detalles_pedidos(
    id int primary key auto_increment,
    idPedido int,
    idProducto int,
    cantidad integer,
    subtotal float,
    foreign key (idPedido) references pedidos(id),
    foreign key (idProducto) references productos(id)
);

select * from pedidos;