import { Component } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

declare var google: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  map: any; // Manejador del mapa.
  coords : any = { lat: 0, lng: 0 }
  dataReturned:any;


  constructor( 
    public  platform: Platform,
    private geolocation: Geolocation,
    public modalCtrl : ModalController,) {

      platform.ready().then(() => {
        // La plataforma esta lista y ya tenemos acceso a los plugins.
          this.obtenerPosicion();
       });
    }



    obtenerPosicion():any{
      this.geolocation.getCurrentPosition().then(res => {
        this.coords.lat = res.coords.latitude;
        this.coords.lng = res.coords.longitude;
  
        this.loadMap();
      })
      .catch(
        (error)=>{
          console.log(error);
        }
      );
    }
    loadMap(){
      let mapContainer = document.getElementById('map');
       this.map = new google.maps.Map(mapContainer, {
         center: this.coords,
         zoom: 12
       });
   }

   async nuevoSitio(){// define la funcion asíncrona: cundo no existe coincidencia temporal
    // aquí vamos a abrir el modal para añadir nuestro sitio.
     let mimodal = await this.modalCtrl.create( {// la ejecución de una función async sea pausada hasta que una Promise sea terminada o rechazada, y regresa a la ejecución de la función async después del término. 
      component: ModalPage,
      componentProps: {
        "lat": this.coords.lat,
        "lng": this.coords.lng
      }
    } );
    mimodal.onDidDismiss().then((  dataReturned ) => {
      if (dataReturned !== null) {
        this.dataReturned = this.dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
    return await mimodal.present();
     
  }



















    onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                        'Longitude: '          + position.coords.longitude             + '<br />' +
                        'Altitude: '           + position.coords.altitude              + '<br />' +
                        'Accuracy: '           + position.coords.accuracy              + '<br />' +
                        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                        'Heading: '            + position.coords.heading               + '<br />' +
                        'Speed: '              + position.coords.speed                 + '<br />' +
                        'Timestamp: '          + position.timestamp                    + '<br />';
}

// onError Callback receives a PositionError object
//
 onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

}
