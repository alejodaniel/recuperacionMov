import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ViewController } from '@ionic/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DatabaseService } from '../services/database.service';
//import { BookInterface } from '../models/book-interface';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {

lat:number;
lng:number;


description: string = '';
foto: any = '';


  constructor( 
    public navParams: NavParams,
    private modalController: ModalController,
    private camera: Camera,
    private db: DatabaseService,
    private dataApiService: DatabaseService
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    /*
    this.coords.lat = this.navParams.get('lat');
    this.coords.lng = this.navParams.get('lng');*/
    this.lat = this.navParams.data.lat;
    this.lng = this.navParams.data.lng;
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
/*
  getAddress(coords):any {
    var geocoder = new google.maps.Geocoder();

    return new Promise(function(resolve, reject) {
        geocoder.geocode({'location': coords} , function (results, status) { // llamado asincronamente
            if (status == google.maps.GeocoderStatus.OK) {
                resolve(results);
            } else {
                reject(status);
            }
        });
    });
}*/


sacarFoto(){
  let options: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    targetWidth: 1000,
    targetHeight: 1000,
    quality: 100
  }
  this.camera.getPicture( options )
  .then(imageData => {
    this.foto = `data:image/jpeg;base64,${imageData}`;
  })
  .catch(error =>{
    console.error( error );
  });
}



guardarSitio(){
  let sitio = {
    lat: this.lat,
    lng: this.lng ,
    description: this.description,
    foto: this.foto
  }
  this.db.addSitio(sitio).then((res)=>{
    this.closeModal();
    alert('se ha introducido correctamente en la bd'); 
  },(err)=>{  alert('error al meter en la bd'+err)  })
}
/*
onPreUpdateBook(book: BookInterface): void {
  this.dataApiService.selectedBook = Object.assign({}, book);
}

resetForm(bookForm?: NgForm): void {
  this.dataApiService.selectedBook = {
    id: null,
    lat: '',
    lng: '',
    descripcion: '',
    foto: ''
  };
}*/

}
