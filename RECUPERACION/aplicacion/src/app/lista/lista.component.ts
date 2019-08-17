import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent  {

  coords : any = { lat: 0, lng: 0 }
  sitios: any;



  constructor( 
    //public navParams: NavParams,
    public db : DatabaseService
    ) {}

    ionViewDidLoad() {
      console.log('ionViewDidLoad Tab3Page');
    }

  ionViewDidEnter(){
    this.db.getSitios().then((res)=>{
   this.sitios = [];
   for(var i = 0; i < res.rows.length; i++){
       this.sitios.push({
         id: res.rows.item(i).id,
         lat: res.rows.item(i).lat,
         lng: res.rows.item(i).lng,
         description: res.rows.item(i).description,
         foto: res.rows.item(i).foto
       });
   }

   },(err)=>{ /* alert('error al sacar de la bd'+err) */ })
  }

}
