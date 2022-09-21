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
  tablaConductor: string = "CREATE TABLE IF NOT EXISTS conductor(correo_conductor VARCHAR(150) PRIMARY KEY NOT NULL, Nombre VARCHAR(40) NOT NULL,Apellido VARCHAR(40) NOT NULL,Contrasennia VARCHAR(40) NOT NULL, id_c VARCHAR(40) NOT NULL);";
  //tabla usuario
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(correo_usuario VARCHAR(150) PRIMARY KEY NOT NULL, Nombre VARCHAR(40) NOT NULL,Apellido VARCHAR(40) NOT NULL,Contrasennia VARCHAR(40) NOT NULL, id_u VARCHAR(40) NOT NULL);";
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

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }
}
