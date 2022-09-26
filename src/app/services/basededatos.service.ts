import { Injectable } from '@angular/core';
import {Platform, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Conductores } from './conductores';
import { Usuarios } from './usuarios';
import { Viajes } from './viajes';
import { Detalle } from './detalle';
import { Vehiculos } from './vehiculos';
import { Comuna } from './comuna';


@Injectable({
  providedIn: 'root'
})
export class BasededatosService {
  // variable para manipular la conexion a la base de datos
  public database: SQLiteObject;
  //tabla conductor
  tablaConductor: string = "CREATE TABLE IF NOT EXISTS conductor(correo_conductor VARCHAR(150) PRIMARY KEY, Nombre VARCHAR(40) NOT NULL,Apellido VARCHAR(40) NOT NULL,Contrasennia VARCHAR(40) NOT NULL, tipo_c VARCHAR(40) NOT NULL);";
  registroConductor: string = "INSERT or IGNORE INTO conductor(correo_conductor,Nombre,Apellido,Contrasennia,tipo_c) VALUES ('a@a.com','Pepito','pica','123456789','c');";
  registroConductor2: string = "INSERT or IGNORE INTO conductor(correo_conductor,Nombre,Apellido,Contrasennia,tipo_c) VALUES ('b@a.com','xd','d','123456789','c');";

  listaConductores = new BehaviorSubject([]);
  //tabla usuario
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(correo_usuario VARCHAR(150) PRIMARY KEY NOT NULL, Nombre VARCHAR(40) NOT NULL,Apellido VARCHAR(40) NOT NULL,Contrasennia VARCHAR(40) NOT NULL, tipo_u VARCHAR(40) NOT NULL);";
  registroUsuario: string = "INSERT or IGNORE INTO usuario(correo_usuario,Nombre,Apellido,Contrasennia,tipo_u) VALUES ('aa@aa.com','sisis','nono','123456789','u');";
  listaUsuarios = new BehaviorSubject([]);
  //tabla bonificacion
  tablaBono: string = "CREATE TABLE IF NOT EXISTS bonificacion(id_boni INTEGER PRIMARY KEY autoincrement, bonificacion INTEGER NOT NULL,correo  VARCHAR(150) ,FOREIGN KEY(correo) REFERENCES conductor(correo_conductor));";
  registroBono: string = "INSERT or IGNORE INTO bonificacion(id_boni,bonificacion,correo) VALUES (1,5000,'nono','a@a.com');";
  listaBono = new BehaviorSubject([]);
  //tabla viaje
  tablaviaje: string = "CREATE TABLE IF NOT EXISTS viaje(id_viaje INTEGER PRIMARY KEY autoincrement, Descripcion VARCHAR(200) NOT NULL,Precio INTEGER NOT NULL,Direccion VARCHAR(70) NOT NULL,correoc  VARCHAR(150),FOREIGN KEY(correoc) REFERENCES conductor(correo_conductor));";
  registroViaje: string = "INSERT or IGNORE INTO viaje(id_viaje,Descripcion,Precio,Direccion,correoc) VALUES (1,'Auto color naranjo',2000,'Quilicura','a@a.com');";
  registroViaje2: string = "INSERT or IGNORE INTO viaje(id_viaje,Descripcion,Precio,Direccion,correoc) VALUES (2,'Auto color naranjo',2000,'Perú','b@a.com');";

  listaViajes = new BehaviorSubject([]);
  //tabla detalle viaje
  
  
  /*
  
  
  tabladetalle: string = "CREATE TABLE IF NOT EXISTS detalle(id_detalle INTEGER PRIMARY KEY autoincrement,estado VARCHAR(30),correo_u VARCHAR(150),FOREIGN KEY(correo_u) REFERENCES usuario(correo_usuario),id_via INTEGER,FOREIGN KEY(id_via) REFERENCES viaje(id_viaje));";
  registroDetalle: string = "INSERT or IGNORE INTO detalle(id_detalle,estado,correo_u,id_via) VALUES (1,'Iniciado','aa@aa.com',1);";
  listaDetalle = new BehaviorSubject([]);
  
  //tabla comuna 
  tablacomuna: string = "CREATE TABLE IF NOT EXISTS comuna(id_comuna INTEGER PRIMARY KEY autoincrement,nombre_comuna VARCHAR(30));";
  registroComuna: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre_comuna) VALUES (1,'Quilicura');";
  listaComuna = new BehaviorSubject([]);
  
  //tabla comuna viaje
  tablacomuna_viaje: string = "CREATE TABLE IF NOT EXISTS viaje_comuna(id_viajeC INTEGER PRIMARY KEY autoincrement,id_viaj INTEGER,FOREIGN KEY(id_viaj) REFERENCES viaje(id_viaje),comuna1 INTEGER,FOREIGN KEY(comuna1) REFERENCES comuna(id_comuna));";
  registroComuna_viaje: string = "INSERT or IGNORE INTO viaje_comuna(id_viajeC,id_viaj,comuna1) VALUES (1,1,1);";
  listaComuna_viaje = new BehaviorSubject([]);
  */
  //tabla vehiculo
  tablavehiculo: string = "CREATE TABLE IF NOT EXISTS vehiculo(patente VARCHAR(6) PRIMARY KEY,modelo VARCHAR(60),marca VARCHAR(60),annio VARCHAR(60),correo_c VARCHAR(150),FOREIGN KEY(correo_c) REFERENCES conductor(correo_conductor));";
  registroVehiculo: string = "INSERT or IGNORE INTO vehiculo(patente,modelo,marca,annio,correo_c) VALUES ('333333','Skyline','Nissan','1999','a@a.com');";
  listaVehiculo = new BehaviorSubject([]);
  //observable para manipular si la BD esta lista  o no para su manipulación
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController) { 
    this.crearBD();

  }
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }
  fetchConductores(): Observable<Conductores[]> {
    return this.listaConductores.asObservable();
  }
  fetchUsuario(): Observable<Usuarios[]> {
    return this.listaUsuarios.asObservable();
  }
  fetchViaje(): Observable<Viajes[]> {
    return this.listaViajes.asObservable();
  }
  /*
  fetchDetalle(): Observable<Detalle[]> {
    return this.listaDetalle.asObservable();
  }
  */
  fetchVehiculo(): Observable<Vehiculos[]> {
    return this.listaVehiculo.asObservable();
  }
  /*
  fetchComuna(): Observable<Comuna[]> {
    return this.listaComuna.asObservable();
  }
  */
  
  crearBD() {
    //verificamos que la plataforma este lista
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite.create({
        name: 'kushau.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardamos la conexion a la BD en la variable propia
        this.database = db;
        //llamar a la funcion para crear las tablas
        this.crearTablas();
      }).catch(e => {
        //muestro el mensaje de error en caso de ocurrir alguno
        this.presentToast("Error BD:" + e);
      })
    })
  }
  

  async crearTablas() {
    try {
      //ejecuto mis tablas
      await this.database.executeSql(this.tablaConductor,[]);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaBono,[]);
      //await this.database.executeSql(this.tablacomuna,[]);
      await this.database.executeSql(this.tablaviaje,[]);
      //await this.database.executeSql(this.tablacomuna_viaje,[]);
      //await this.database.executeSql(this.tabladetalle,[]);
      
      await this.database.executeSql(this.tablavehiculo,[]);
      //registro datos en mis tablas
      await this.database.executeSql(this.registroConductor,[]);
      await this.database.executeSql(this.registroConductor2,[]);
      await this.database.executeSql(this.registroUsuario,[]);
      await this.database.executeSql(this.registroViaje,[]);
      await this.database.executeSql(this.registroViaje2,[]);

      //await this.database.executeSql(this.registroDetalle,[]);
      await this.database.executeSql(this.registroVehiculo,[]);

      //cargar todos los registros de la tabla en el observable
      
      this.buscarUsuarios();
      this.buscarConductores();
      this.buscarVehiculos();
      this.buscarViaje(); 
      this.buscarDetalle();
      


      //actualizar el status de la BD
      this.isDBReady.next(true);

    } catch (e) {
      this.presentToast("Error Tablas: " + e);
    }

  }
  buscarConductores() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM conductor', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Conductores[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            correo_conductor: res.rows.item(i).correo_conductor,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            contrasennia: res.rows.item(i).contrasennia,
            tipo_c: res.rows.item(i).tipo_c

          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaConductores.next(items);
    })
  }
  buscarUsuarios() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Usuarios[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            correo_usuario: res.rows.item(i).correo_usuario,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            contrasennia: res.rows.item(i).contrasennia,
            tipo_u: res.rows.item(i).tipo_u

          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaUsuarios.next(items);
    })
  }
  buscarViaje() {
    //retorno la ejecución del select
    
    return this.database.executeSql('SELECT descripcion,precio,direccion,c.nombre,v.modelo FROM viaje join conductor c join vehiculo v where c.correo_conductor = v.correo_conductor', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Viajes[] = [];
      //Inner Join
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_viaje: res.rows.item(i).id_viaje,
            Descripcion: res.rows.item(i).Descripcion,
            Precio: res.rows.item(i).Precio,
            Direccion: res.rows.item(i).Direccion,
            correoc: res.rows.item(i).correoc,
            nombre:res.rows.item(i).nombre
            //variables de la otra tabla
          })
        }
      }
      //actualizamos el observable de las noticias
      this.listaViajes.next(items);
    })
  }
  buscarDetalle() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM detalle', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Detalle[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_detalle: res.rows.item(i).id_detalle,
            estado: res.rows.item(i).estado,
            correo_u: res.rows.item(i).correo_u,
            id_via: res.rows.item(i).id_via

          })
        }

      }
      //actualizamos el observable de las noticias
      //this.listaDetalle.next(items);
    })
  }
  buscarVehiculos() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM vehiculo', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Vehiculos[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            patente: res.rows.item(i).patente,
            modelo: res.rows.item(i).modelo,
            marca: res.rows.item(i).marca,
            annio: res.rows.item(i).annio,
            correo_c: res.rows.item(i).correo_c

          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaVehiculo.next(items);
    })
  }


  //insertarConductor(correo_conductor,Nombre,Apellido,Contrasennia,tipo_c){
    //Crear una lista para agregar los datos
    //let data = [correo_conductor,Nombre,Apellido,Contrasennia,tipo_c];
    //Insertar los datos junto con la lista. Los datos van en '?' y se agregan en orden de la lista
    //return this.database.executeSql('INSERT INTO vehiculo(patente,modelo,marca,annio) VALUES (?,?) WHERE correo_c= ?',data).then(res =>{
      //Se actualiza la información
      //this.buscarNoticias();
      
    //});
  //}

}
