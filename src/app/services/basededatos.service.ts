import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from './usuarios';
import { Viajes } from './viajes';
import { Detalle } from './detalle';
import { Comuna } from './comuna';
import { Autos } from './autos';
import { ViajeComuna } from './viaje-comuna';
import { Rol } from './rol';
import { Login } from './login';
import { Router } from '@angular/router';
import { Perfil } from './perfil';
import { Activos } from './activos';


@Injectable({
  providedIn: 'root'
})
export class BasededatosService {
  //Nueva tabla de base de datos
  //tabla rol usuario
  tRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY, nombre_r VARCHAR(15) NOT NULL);";
  registroRol: string = "INSERT or IGNORE INTO rol(id_rol,nombre_r) VALUES (1,'Usuario');";
  registroRol2: string = "INSERT or IGNORE INTO rol(id_rol,nombre_r) VALUES (2,'Conductor');";
  listaRol = new BehaviorSubject([]);
  //tabla usuarios
  tUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(correo VARCHAR(150) PRIMARY KEY, nombre VARCHAR(40) NOT NULL, apellido VARCHAR(40) NOT NULL, contrasennia VARCHAR(40) NOT NULL, tR_idRol INTEGER, FOREIGN KEY(tR_idRol) REFERENCES Rol(id_rol));";
  registroUsuario: string = "INSERT or IGNORE INTO usuario(correo,nombre,apellido,contrasennia,tR_idRol) VALUES ('a@a.com','Pepito','pica','123456789',2);";
  registroUsuario2: string = "INSERT or IGNORE INTO usuario(correo,nombre,apellido,contrasennia,tR_idRol) VALUES ('b@a.com','xd','d','123456789',1);";
  listaUsuarios = new BehaviorSubject([]);
  //tabla auto
  tAuto: string = "CREATE TABLE IF NOT EXISTS auto(patente VARCHAR(6) PRIMARY KEY,modelo VARCHAR(35),marca VARCHAR(35),annio INTEGER, tU_correo VARCHAR(150), FOREIGN KEY (tU_correo) REFERENCES Usuario(correo));";
  registroAuto: string = "INSERT or IGNORE INTO auto(patente,modelo,marca,annio,tU_correo) VALUES ('1122AA','SkyLine','Nisssan',2019,'a@a.com');";
  listaAuto = new BehaviorSubject([]);
  //tabla viaje
  tViaje: string = "CREATE TABLE IF NOT EXISTS viaje(id_viaje INTEGER PRIMARY KEY AUTOINCREMENT, descripcion VARCHAR(210) NOT NULL, precio INTEGER NOT NULL,fila_u INTEGER NOT NULL, fecha_viaje DATE NOT NULL, asientos_disp INTEGER NOT NULL, tA_patente VARCHAR(6), FOREIGN KEY(tA_patente) REFERENCES auto(patente));";
  registroViaje: string = "INSERT or IGNORE INTO viaje(id_viaje,descripcion,precio,fila_u,fecha_viaje,asientos_disp,tA_patente) VALUES (1,'Auto color verde',2000,6,CURRENT_DATE,4,'1122AA');";
  registroViaje2: string = "INSERT or IGNORE INTO viaje(id_viaje,descripcion,precio,fila_u,fecha_viaje,asientos_disp,tA_patente) VALUES (2,'Auto con la wea rota',4000,6,CURRENT_DATE,1,'1122AA');";

  listaViajes = new BehaviorSubject([]);
  //tabla comuna
  tComuna: string = "CREATE TABLE IF NOT EXISTS comuna(id_comuna INTEGER PRIMARY KEY, nombre_comuna VARCHAR(20));";
  registroComuna: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre_comuna) VALUES (1,'Quilicura');";
  listaComuna = new BehaviorSubject([]);

  //tabla Viaje Comuna
  tViajeC: string = "CREATE TABLE IF NOT EXISTS viaje_comuna( id_vc INTEGER PRIMARY KEY AUTOINCREMENT, V_idViaje INTEGER,V_idComuna INTEGER, FOREIGN KEY (V_idViaje) REFERENCES viaje(id_viaje), FOREIGN KEY (V_idComuna) REFERENCES comuna(id_comuna));";
  registroViajeC: string = "INSERT or IGNORE INTO viaje_comuna(id_vc,V_idViaje,V_idComuna) VALUES (1,1,1);";
  registroViajeC2: string = "INSERT or IGNORE INTO viaje_comuna(id_vc,V_idViaje,V_idComuna) VALUES (2,2,1);";
  listaViajeC = new BehaviorSubject([]);

  //Tabla detalle
  tDetalleV: string = "CREATE TABLE IF NOT EXISTS detalle_viaje(id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, estado VARCHAR(10), u_correo VARCHAR(150), tV_idViaje INTEGER, FOREIGN KEY(u_correo) REFERENCES usuario(correo), FOREIGN KEY (tV_idViaje) REFERENCES viaje(id_viaje));";
  registroDetalle: string = "INSERT or IGNORE INTO detalle_viaje(id_detalle,estado,u_correo,tV_idViaje) VALUES (1,'Comenzado','b@a.com',1);";
  registroDetalle2: string = "INSERT or IGNORE INTO detalle_viaje(id_detalle,estado,u_correo,tV_idViaje) VALUES (2,'Terminado','b@a.com',2);";
  listaDetalle = new BehaviorSubject([]);
  //Observables
  listaLogin = new BehaviorSubject([]);
  listaPerfil = new BehaviorSubject([]);
  listaActivos = new BehaviorSubject([]);


  // variable para manipular la conexion a la base de datos
  public database: SQLiteObject;
  //tipo usuario
  /*Re Hacer base de datos y juntar los dos usuarios para mayor simpleza guiarse de la bd que hizo el profe */

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController,private router: Router) {
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
  fetchRol(): Observable<Rol[]> {
    return this.listaRol.asObservable();
  }
  fetchUsuario(): Observable<Usuarios[]> {
    return this.listaUsuarios.asObservable();
  }
  fetchViaje(): Observable<Viajes[]> {
    return this.listaViajes.asObservable();
  }
  fetchDetalle(): Observable<Detalle[]> {
    return this.listaDetalle.asObservable();
  }
  fetchAuto(): Observable<Autos[]> {
    return this.listaAuto.asObservable();
  }
  fetchComuna(): Observable<Comuna[]> {
    return this.listaComuna.asObservable();
  }
  fetchLogin(): Observable<Login[]> {
    return this.listaLogin.asObservable();
  }
  fetchperfil(): Observable<Perfil[]> {
    return this.listaPerfil.asObservable();
  }
  fetchActivos(): Observable<Activos[]> {
    return this.listaActivos.asObservable();
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
      await this.database.executeSql(this.tRol, []);
      await this.database.executeSql(this.tUsuario, []);
      await this.database.executeSql(this.tAuto, []);
      await this.database.executeSql(this.tViaje, []);
      await this.database.executeSql(this.tComuna, []);
      await this.database.executeSql(this.tViajeC, []);
      await this.database.executeSql(this.tDetalleV, []);

      //registro datos en mis tablas
      await this.database.executeSql(this.registroRol, []);
      await this.database.executeSql(this.registroRol2, []);
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroUsuario2, []);
      await this.database.executeSql(this.registroViaje, []);
      await this.database.executeSql(this.registroViaje2, []);
      await this.database.executeSql(this.registroAuto, []);
      await this.database.executeSql(this.registroComuna, []);
      await this.database.executeSql(this.registroViajeC, []);
      await this.database.executeSql(this.registroViajeC2, []);
      await this.database.executeSql(this.registroDetalle, []);
      await this.database.executeSql(this.registroDetalle2, []);


      //cargar todos los registros de la tabla en el observable
      this.buscarRol();
      this.buscarUsuarios();
      this.buscarAutos();
      this.buscarViaje()
      this.filtrarViaje();
      this.buscarComuna();
      this.buscarComunaViaje();
      this.buscarDetalle();



      //actualizar el status de la BD
      this.isDBReady.next(true);

    } catch (e) {
      this.presentToast("Error Tablas: " + e);
    }

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
            correo2: res.rows.item(i).correo,
            nombre2: res.rows.item(i).nombre,
            apellido2: res.rows.item(i).apellido,
            contrasennia2: res.rows.item(i).contrasennia,
            tR_idRol2: res.rows.item(i).tR_idRol

          })
        }
      }
      //actualizamos el observable de las noticias
      this.listaUsuarios.next(items);
    })
  }
  buscarViaje() {
    //retorno la ejecución del select

    return this.database.executeSql("SELECT * from viaje;", []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Viajes[] = [];
      //falta arreglar por que no tira nada
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_viaje2: res.rows.item(i).id_viaje,
            descripcion2: res.rows.item(i).descripcion,
            precio2: res.rows.item(i).precio,
            asientos_disp2: res.rows.item(i).asientos_disp,
            tA_patente2: res.rows.item(i).tA_patent,
          })
        }
      }
      //actualizamos el observable de las noticias
      this.listaViajes.next(items);
    })
  }
  filtrarViaje() {
    //retorno la ejecución del select

    return this.database.executeSql("select v.id_viaje, v.descripcion, v.fecha_viaje, v.precio, v.asientos_disp, u.nombre, a.patente, c.nombre_comuna, dv.estado from viaje_comuna vc inner join viaje v on  vc.v_idviaje = v.id_viaje inner join detalle_viaje dv on v.id_viaje = dv.tv_idviaje inner join auto a on v.ta_patente = a.patente inner join usuario u on a.tu_correo= u.correo inner join comuna c on  vc.v_idcomuna= c.id_comuna where dv.estado = 'Comenzado';", []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Activos[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            precio3: res.rows.item(i).precio,
            asientos_disp3: res.rows.item(i).asientos_disp,
            nombre3: res.rows.item(i).nombre,
            patente3: res.rows.item(i).patente,
            nombre_comuna3: res.rows.item(i).nombre_comuna,
          })
        }
      }
      //actualizamos el observable de las noticias
      this.listaActivos.next(items);
    })
  }
  buscarDetalle() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM detalle_viaje', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Detalle[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_detalle: res.rows.item(i).id_detalle,
            estado: res.rows.item(i).estado,
            u_correo: res.rows.item(i).u_correo,
            tV_idViaje: res.rows.item(i).tV_idViaje

          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaDetalle.next(items);
    })
  }
  buscarComuna() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM comuna', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Comuna[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_comuna: res.rows.item(i).id_comuna,
            nombre_comuna: res.rows.item(i).nombre_comuna
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaComuna.next(items);
    })
  }
  buscarComunaViaje() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM viaje_comuna', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: ViajeComuna[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_vc: res.rows.item(i).id_vc,
            V_idViaje: res.rows.item(i).V_idViaje,
            V_idComuna: res.rows.item(i).V_idComuna

          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaViajeC.next(items);
    })
  }
  buscarRol() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM rol', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Rol[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_rol: res.rows.item(i).id_rol,
            nombre_r: res.rows.item(i).nombre_r,
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaRol.next(items);
    })
  }
  buscarAutos() {
    //retorno la ejecución del select
    //re hacer por que faltan los datos nuevos
    return this.database.executeSql('SELECT * FROM auto', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Autos[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            patente: res.rows.item(i).patente,
            modelo: res.rows.item(i).modelo,
            marca: res.rows.item(i).marca,
            annio: res.rows.item(i).annio,
            tU_correo: res.rows.item(i).tU_correo

          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaAuto.next(items);
    })
  }


  loginUsuario(correo, clave) {
    let data = [correo, clave];
    return this.database.executeSql('SELECT correo, tR_idRol FROM usuario WHERE correo = ? and contrasennia = ?', data).then((res) => {
      let item2: Login[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          item2.push({
            correo2: res.rows.item(i).correo,
            tR_idRol2: res.rows.item(i).tR_idRol
          });
        }
        
        //crear variables storage
        if (item2[0].tR_idRol2 == 1) {
          this.router.navigate(['/tabs'])
          //redirigir con el navigate
        }
        else {
          this.router.navigate(['/tabconductor'])
          //redirigir con el navigate
        }

      }
      else {
        this.presentToast("Usuario y/o clave incorrecta");
      }
      this.listaLogin.next(item2);

    })

  }
  buscarPerfil(usuario) {
    let data =[usuario]
    //retorno la ejecución del select
    return this.database.executeSql("SELECT correo,nombre,apellido,nombre||' '||apellido as completo FROM usuario where correo = ?", data).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Perfil[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            correo2: res.rows.item(i).correo,
            nombre2: res.rows.item(i).nombre,
            apellido2: res.rows.item(i).apellido,
            nombreCompleto2: res.rows.item(i).completo
  
          })
        }
      }
      //actualizamos el observable de las noticias
      this.listaPerfil.next(items);
    })
  }

}
