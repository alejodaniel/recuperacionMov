import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db : SQLiteObject = null;
  sitios: Observable<any>;
  sitio: Observable<any>;
  constructor(public sqlite: SQLite) { }

  public openDb(){
    return this.sqlite.create({
        name: 'data.db',
        location: 'default' // el campo location es obligatorio
    })
    .then((db: SQLiteObject) => {
      this.db =db;
    })
    .catch(error =>{
      console.error(error);
    });
}

public createTableSitios(){
  return this.db.executeSql("create table if not exists sitios( id INTEGER PRIMARY KEY AUTOINCREMENT, lat FLOAT, lng FLOAT, description TEXT, foto TEXT )",[])
}

public addSitio(sitio){
  let sql = "INSERT INTO sitios (lat, lng, description, foto) values (?,?,?,?)";
  return this.db.executeSql(sql,[sitio.lat,sitio.lng,sitio.description,sitio.foto]);
}

public getSitios(){
  let sql = "SELECT * FROM sitios";
  return this.db.executeSql(sql,[]);
}
}
