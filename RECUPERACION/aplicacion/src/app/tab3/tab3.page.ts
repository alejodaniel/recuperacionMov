import { Component } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { DbService } from '../../app/db.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  coords : any = { lat: 0, lng: 0 }
  sitios: any;



  constructor( 
    //public navParams: NavParams,
    private modalController: ModalController,
    public db : DbService
    ) {}

    ionViewDidLoad() {
      console.log('ionViewDidLoad Tab3Page');
    }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
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
