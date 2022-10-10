import { Injectable } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';
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
import { Router, RouterLinkWithHref } from '@angular/router';
import { Perfil } from './perfil';
import { Activos } from './activos';
import { PerfilC } from './perfil-c';
import { Patente } from './patente';
import { idViaje } from './id-viaje';
import { AutoC } from './auto-c';
import { MotrarV } from './motrar-v';
import { DetalleConductor } from './detalle-conductor';
import { Navigation } from 'selenium-webdriver';



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
  tUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(correo VARCHAR(150) PRIMARY KEY, nombre VARCHAR(40) NOT NULL, apellido VARCHAR(40) NOT NULL,telefono INTEGER, contrasennia VARCHAR(40) NOT NULL, tR_idRol INTEGER, FOREIGN KEY(tR_idRol) REFERENCES Rol(id_rol));";
  registroUsuario: string = "INSERT or IGNORE INTO usuario(correo,nombre,apellido,telefono,contrasennia,tR_idRol) VALUES ('a@a.com','Ignacio','Salas Messi',12345678,'123',2);";
  registroUsuario2: string = "INSERT or IGNORE INTO usuario(correo,nombre,apellido,telefono,contrasennia,tR_idRol) VALUES ('b@a.com','Hugo','Salas Messi',87654321,'123',1);";
  listaUsuarios = new BehaviorSubject([]);
  //tabla auto
  tAuto: string = "CREATE TABLE IF NOT EXISTS auto(patente VARCHAR(6) PRIMARY KEY,modelo VARCHAR(35),marca VARCHAR(35),annio INTEGER, tU_correo VARCHAR(150), FOREIGN KEY (tU_correo) REFERENCES Usuario(correo));";
  registroAuto: string = "INSERT or IGNORE INTO auto(patente,modelo,marca,annio,tU_correo) VALUES ('1122AA','SkyLine','Nisssan',2019,'a@a.com');";
  listaAuto = new BehaviorSubject([]);
  //tabla viaje
  tViaje: string = "CREATE TABLE IF NOT EXISTS viaje(id_viaje INTEGER PRIMARY KEY AUTOINCREMENT, descripcion VARCHAR(210) NOT NULL, precio INTEGER NOT NULL,fila_u INTEGER NOT NULL,asientos_disp INTEGER NOT NULL, tA_patente VARCHAR(6),v_idcomuna INTEGER NOT NULL, FOREIGN KEY(tA_patente) REFERENCES auto(patente),FOREIGN KEY(v_idcomuna) REFERENCES comuna(id_comuna));";
  registroViaje: string = "INSERT or IGNORE INTO viaje(id_viaje,descripcion,precio,fila_u,asientos_disp,tA_patente,v_idcomuna) VALUES (1,'Auto color verde',2000,6,4,'1122AA',1);";
  registroViaje2: string = "INSERT or IGNORE INTO viaje(id_viaje,descripcion,precio,fila_u,asientos_disp,tA_patente,v_idcomuna) VALUES (2,'Auto con la wea rota',4000,6,1,'1122AA',1);";
  listaViajes = new BehaviorSubject([]);
  //tabla comuna
  tComuna: string = "CREATE TABLE IF NOT EXISTS comuna(id_comuna INTEGER PRIMARY KEY, nombre_comuna VARCHAR(20));";
  registroComuna: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre_comuna) VALUES (1,'Quilicura');";
  registroComuna2: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre_comuna) VALUES (2,'Conchali');";
  listaComuna = new BehaviorSubject([]);

  //tabla Viaje Comuna
  /*
  tViajeC: string = "CREATE TABLE IF NOT EXISTS viaje_comuna( id_vc INTEGER PRIMARY KEY AUTOINCREMENT, V_idViaje INTEGER,V_idComuna INTEGER, FOREIGN KEY (V_idViaje) REFERENCES viaje(id_viaje), FOREIGN KEY (V_idComuna) REFERENCES comuna(id_comuna));";
  registroViajeC: string = "INSERT or IGNORE INTO viaje_comuna(id_vc,V_idViaje,V_idComuna) VALUES (1,1,1);";
  registroViajeC2: string = "INSERT or IGNORE INTO viaje_comuna(id_vc,V_idViaje,V_idComuna) VALUES (2,2,1);";
  listaViajeC = new BehaviorSubject([]);
  */

  //Tabla detalle
  tDetalleV: string = "CREATE TABLE IF NOT EXISTS detalle_viaje(id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, estado VARCHAR(10), u_correo VARCHAR(150), tV_idViaje INTEGER, FOREIGN KEY(u_correo) REFERENCES usuario(correo), FOREIGN KEY (tV_idViaje) REFERENCES viaje(id_viaje));";
  registroDetalle: string = "INSERT or IGNORE INTO detalle_viaje(id_detalle,estado,u_correo,tV_idViaje) VALUES (1,'Comenzado','b@a.com',1);";
  registroDetalle2: string = "INSERT or IGNORE INTO detalle_viaje(id_detalle,estado,u_correo,tV_idViaje) VALUES (2,'Terminado','b@a.com',2);";
  listaDetalle = new BehaviorSubject([]);

  //Observables
  listaLogin = new BehaviorSubject([]);
  listaPerfil = new BehaviorSubject([]);
  listaActivos = new BehaviorSubject([]);
  listaPerfilC = new BehaviorSubject([]);
  listaPatentes = new BehaviorSubject([]);
  listaId = new BehaviorSubject([]);
  listaAutoC = new BehaviorSubject([]);
  listaDetalleV = new BehaviorSubject([]);
  listaMostrarV = new BehaviorSubject([]);


  // variable para manipular la conexion a la base de datos
  public database: SQLiteObject;
  //tipo usuario
  /*Re Hacer base de datos y juntar los dos usuarios para mayor simpleza guiarse de la bd que hizo el profe */

  //idea nefasta
  idDV: any ="";
  //
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private alertController:AlertController,private sqlite: SQLite, private platform: Platform, private toastController: ToastController, private router: Router) {
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
  fetchPerfilC(): Observable<PerfilC[]> {
    return this.listaPerfilC.asObservable();
  }
  fetchPatente(): Observable<Patente[]> {
    return this.listaPatentes.asObservable();
  }
  //Observable id del viaje.
  fetchIDv(): Observable<idViaje[]> {
    return this.listaId.asObservable();
  }
  fetchAutoC(): Observable<AutoC[]> {
    return this.listaAutoC.asObservable();
  }
  fetchMostrarV(): Observable<MotrarV[]> {
    return this.listaMostrarV.asObservable();
  }
  fetchDetalleV(): Observable<DetalleConductor[]> {
    return this.listaDetalleV.asObservable();
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
      /*await this.database.executeSql(this.tViajeC, []);*/
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
      await this.database.executeSql(this.registroComuna2, []);
      await this.database.executeSql(this.registroDetalle, []);
      await this.database.executeSql(this.registroDetalle2, []);


      //cargar todos los registros de la tabla en el observable
      this.buscarRol();
      this.buscarUsuarios();
      this.buscarAutos();
      this.buscarViaje()
      this.filtrarViaje();
      this.buscarComuna();
      /*
      this.buscarComunaViaje();*/
      this.buscarDetalle();
      //this.buscarMaxID();



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

    return this.database.executeSql("select v.id_viaje, v.descripcion, v.precio, v.asientos_disp, u.nombre, a.patente,c.nombre_comuna from viaje v inner join auto a on v.ta_patente = a.patente inner join usuario u on a.tu_correo= u.correo inner join comuna c on  v.v_idcomuna= c.id_comuna;", []).then(res => {
      //select v.id_viaje, v.descripcion, v.fecha_viaje, v.precio, v.asientos_disp, u.nombre, a.patente, c.nombre_comuna, dv.estado from viaje v inner join detalle_viaje dv on v.id_viaje = dv.tv_idviaje inner join auto a on v.ta_patente = a.patente inner join usuario u on a.tu_correo= u.correo inner join comuna c on  v.v_idcomuna= c.id_comuna where dv.estado = 'Comenzado';
      //creo mi lista de objetos de noticias vacio
      let items: Activos[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_viaje3: res.rows.item(i).id_viaje,
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
  mostrarViaje(x) {
    //retorno la ejecución del select
    let data = [x];
    return this.database.executeSql("select v.id_viaje, v.descripcion, v.precio,v.fila_u,v.asientos_disp, u.nombre||' '||u.apellido as nombre, a.patente,a.marca||' '||a.modelo as auto,c.nombre_comuna from viaje v inner join auto a on v.ta_patente = a.patente inner join usuario u on a.tu_correo= u.correo inner join comuna c on  v.v_idcomuna= c.id_comuna where id_viaje = ? ;", data).then(res => {
      //select v.id_viaje, v.descripcion, v.fecha_viaje, v.precio, v.asientos_disp, u.nombre, a.patente, c.nombre_comuna, dv.estado from viaje v inner join detalle_viaje dv on v.id_viaje = dv.tv_idviaje inner join auto a on v.ta_patente = a.patente inner join usuario u on a.tu_correo= u.correo inner join comuna c on  v.v_idcomuna= c.id_comuna where dv.estado = 'Comenzado';
      //creo mi lista de objetos de noticias vacio
      let items: MotrarV[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_viaje2: res.rows.item(i).id_viaje,
            descripcion2: res.rows.item(i).descripcion,
            precio3: res.rows.item(i).precio,
            fila3:res.rows.item(i).fila_u,
            asientos_disp3: res.rows.item(i).asientos_disp,
            nombre3: res.rows.item(i).nombre,
            patente3: res.rows.item(i).patente,
            auto3:res.rows.item(i).auto,
            nombre_comuna3: res.rows.item(i).nombre_comuna,
          })
        }
      }
      //actualizamos el observable de las noticias
      this.listaMostrarV.next(items);
      this.router.navigate(['/tomarauto']);
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
  //BUSCAR EL AUTO DE UN CONDUCTOR
  buscarAutoC(usuario) {
    let data = [usuario]
    //retorno la ejecución del select
    //re hacer por que faltan los datos nuevos
    return this.database.executeSql('SELECT * FROM auto where tU_correo = ?;', data).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: AutoC[] = [];
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
      this.listaAutoC.next(items);
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
    let data = [usuario]
    //retorno la ejecución del select
    return this.database.executeSql("SELECT correo,nombre,apellido,nombre||' '||apellido as completo, telefono FROM usuario where correo = ?", data).then(res => {
      //creo mi lista de objetos vacio
      let items: Perfil[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            correo2: res.rows.item(i).correo,
            nombre2: res.rows.item(i).nombre,
            apellido2: res.rows.item(i).apellido,
            nombreCompleto2: res.rows.item(i).completo,
            telefono: res.rows.item(i).telefono
          })
        }
      }
      //actualizamos el observable de las noticias
      this.listaPerfil.next(items);
    })
  }

  buscarPerfilC(usuario2) {
    let data = [usuario2]
    //retorno la ejecución del select
    return this.database.executeSql("SELECT correo,nombre,apellido,nombre||' '||apellido as completo,auto.marca ||' '||auto.modelo as Vehiculo,telefono FROM usuario INNER JOIN auto on usuario.correo = auto.tU_correo  where usuario.correo = ?", data).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items3: PerfilC[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items3.push({
            correo4: res.rows.item(i).correo,
            nombre4: res.rows.item(i).nombre,
            apellido4: res.rows.item(i).apellido,
            nombreCompleto4: res.rows.item(i).completo,
            vehiculo: res.rows.item(i).Vehiculo,
            telefonoC:res.rows.item(i).telefono
          })
        }
      }
      //actualizamos el observable de las noticias
      this.listaPerfilC.next(items3);
    })
  }

  obtenerPatente(usuario2) {
    let data = [usuario2]
    //retorno la ejecución del select
    return this.database.executeSql('SELECT patente FROM auto where tU_correo = ?', data).then(res => {
      //creo mi lista de objetos de noticias vacio

      let items: Patente[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            patente1: res.rows.item(i).patente
          })
        }
      }
      //actualizamos el observable de las noticias
      this.listaPatentes.next(items);
    })
  }
  //

  filtrarDetalle (id) {
    let data = [id]
    //retorno la ejecución del select
    return this.database.executeSql('SELECT viaje.precio,comuna.nombre_comuna,detalle_viaje.u_correo FROM detalle_viaje INNER JOIN viaje on viaje.id_viaje = detalle_viaje.tV_idViaje INNER JOIN comuna on viaje.v_idcomuna = comuna.id_comuna where tV_idViaje = ?', data).then(res => {
      //creo mi lista de objetos de noticias vacio

      let items: DetalleConductor[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            precio: res.rows.item(i).precio,
            comuna:res.rows.item(i).nombre_comuna,
            correo: res.rows.item(i).u_correo
          })
        }
      }
      //actualizamos el observable de las noticias
      this.buscarDetalle();
      this.listaDetalleV.next(items);
    })
  }

  insertarViaje(descripcion, precio, fila, asientos, patente, v_idcomuna) {
    let data = [descripcion, precio, fila, asientos, patente, v_idcomuna];
    return this.database.executeSql('INSERT INTO viaje(descripcion,precio,fila_u,asientos_disp,tA_patente,v_idcomuna) VALUES (?,?,?,?,?,?);', data).then((res) => {
      //this.presentAlert("ID insertado: " + JSON.stringify(res));
      //Crear un observable para insertID, su función de retorno y guardar en el observable el id .(next)
        let estado: string="Empezado";
      //this.presentAlert("ID insertado2: " + res.insertId);
      //Insertar en tabla detalle viaje
      this.insertarDV(estado,res.insertId);
      this.buscarDetalle();
      this.buscarViaje();
      this.filtrarViaje();
      this.idDV= res.insertId

    });
  }
  cancelarViaje(id){
    return this.database.executeSql('UPDATE detalle_viaje set estado="Terminado" where tV_idViaje =?', id).then(res=>{
      this.buscarDetalle();
    });
  }
  tomarViaje(u_correo,id){
    let data =[u_correo,id]
    return this.database.executeSql('UPDATE detalle_viaje set u_correo = ? where tV_idViaje =?', data).then(res=>{
    })

  }
  insertarDV(estado,tV_idViaje) {
    let data = [estado,tV_idViaje];
    return this.database.executeSql('INSERT INTO detalle_viaje(estado,tV_idViaje) VALUES (?,?);', data).then(res => {
      this.buscarDetalle();
      this.filtrarViaje();
      //id_detalle,estado,u_correo,tV_idViaje
    });
  }
 actPerfil(nom,app,tel,id){
  let data = [nom,app,tel,id];
  return this.database.executeSql('UPDATE usuario SET nombre=?, apellido=?, telefono=? WHERE correo=?',data).then(res => {
    this.buscarPerfil(id);
    this.buscarPerfilC(id);
    this.presentToast("Tu perfil ha sido modificado correctamente.");
  });
 }

 
  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
