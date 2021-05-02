use dbventas;

create table TIPO_USUARIOS(
    id int primary key auto_increment,
    tipo varchar(50)
);

create table USUARIOS(
    id int primary key auto_increment,
    nombre varchar(150),
    email varchar(150),
    password varchar(150),
    idTipoUsuario int,
    foreign key (idTipoUsuario) references TIPO_USUARIOS(id)
);

create table EMPLEADOS(
    id int primary key auto_increment,
    nombre varchar(50),
    paterno varchar(50),
    materno varchar(50),
    edad varchar(10),
    foto varchar(250),
    idUsuario int,
    foreign key (idUsuario) references USUARIOS(id)
);

create table DIRECCIONES(
    id int primary key auto_increment,
    calle varchar(250),
    localidad varchar(150),
    municipio varchar(150),
    estado varchar(150),
    pais varchar(150),
    idEmpleado int,
    foreign key (idEmpleado) references EMPLEADOS(id)
);