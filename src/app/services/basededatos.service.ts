import { Injectable } from '@angular/core';
import {Platform, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasededatosService {
  // variable para manipular la conexion a la base de datos
  public database: SQLiteObject;
  //tabala conductor
  tablaConductor: string = "CREATE TABLE IF NOT EXISTS conductor(correo_conductor VARCHAR(150) PRIMARY KEY NOT NULL, Nombre VARCHAR(40) NOT NULL,Apellido VARCHAR(40) NOT NULL,Contrasennia VARCHAR(40) NOT NULL, tipo_c VARCHAR(40) NOT NULL);";
  //tabla usuario
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(correo_usuario VARCHAR(150) PRIMARY KEY NOT NULL, Nombre VARCHAR(40) NOT NULL,Apellido VARCHAR(40) NOT NULL,Contrasennia VARCHAR(40) NOT NULL, tipo_u VARCHAR(40) NOT NULL);";
  //tabla bonificacion
  tablaBono: string = "CREATE TABLE IF NOT EXISTS bonificacion(id_boni INTEGER PRIMARY KEY autoincrement, bonificacion INTEGER NOT NULL,correo  VARCHAR(150) ,FOREIGN KEY(correo) REFERENCES conductor(correo_conductor));";
  //tabla viaje
  tablaviaje: string = "CREATE TABLE IF NOT EXISTS viaje(id_viaje INTEGER PRIMARY KEY autoincrement, Descrpcion VARCHAR(200) NOT NULL,Precio INTEGER NOT NULL,Direccion VARCHAR(70) NOT NULL,correoc  VARCHAR(150),FOREING KEY(correoc) REFERENCES conductor(correo_conductor));";
  //tabla detalle viaje
  tabladetalle: string = "CREATE TABLE IF NOT EXISTS detalle(id_detalle INTEGER PRIMARY KEY autoincrement,estado VARCHAR(30),correo_u VARCHAR(150),FOREIGN KEY(correo_u) REFERENCES usuario(correo_usuario),id_via INTEGER,FOREIGN KEY(id_via) REFERENCES viaje(id_viaje));";
  //tabla comuna 
  tablacomuna: string = "CREATE TABLE IF NOT EXISTS comuna(id_comuna INTEGER PRIMARY KEY autoincrement,nombre_comuna VARCHAR(30));";
  //tabla comuna viaje
  tablacomuna_viaje: string = "CREATE TABLE IF NOT EXISTS viaje_comuna(id_viajeC INTEGER PRIMARY KEY autoincrement,id_viaj INTEGER,FOREIGN KEY(id_viaj) REFERENCES viaje(id_viaje),comuna INTEGER,FOREIGN KEY (comuna) REFERENCES comuna(id_comuna));";
  //tabla vehiculo
  tablavehiculo: string = "CREATE TABLE IF NOT EXISTS vehiculo(patente VARCHAR(30) PRIMARY KEY,modelo VARCHAR(60),marca VARCHAR(60),annio VARCHAR(60),correo_c VARCHAR(150),FOREIGN KEY(correo_c) REFERENCES conductor(correo_conductor));";
  //observable para manipular si la BD esta lista  o no para su manipulación
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController) { 

  }
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
      await this.database.executeSql(this.tablaConductor,this.tablaUsuario,this.tablaBono,this.tablaviaje,this.tabladetalle,this.tablacomuna,this.tablacomuna_viaje,this.tablavehiculo []);
      //cargar todos los registros de la tabla en el observable
      //this.buscarNoticias(); aqui no se que xuxa va xd
      //actualizar el status de la BD
      this.isDBReady.next(true);

    } catch (e) {
      this.presentToast("Error Tablas: " + e);
    }

  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }
  insertarNoticias(patente,modelo,marca,annio,correo_c){
    //Crear una lista para agregar los datos
    let data = [patente,modelo,marca,annio,correo_c];
    //Insertar los datos junto con la lista. Los datos van en '?' y se agregan en orden de la lista
    return this.database.executeSql('INSERT INTO vehiculo(patente,modelo,marca,annio) VALUES (?,?) WHERE correo_c= ?',data).then(res =>{
      //Se actualiza la información
      //this.buscarNoticias();
      
    });
  }
}
