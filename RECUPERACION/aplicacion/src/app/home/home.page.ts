import { Component,ViewChild } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import{SocialSharing} from '@ionic-native/social-sharing/ngx';
import { MediaCapture , CaptureVideoOptions, MediaFile} from '@ionic-native/media-capture/ngx';
//import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/File/ngx';
import { GaleryModel } from '../model/galeryModel';

const MEDIA_FILE_KEY='mediaFiles';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('myvideo',{static: false}) myVideo: any;
  timestamp:any="";
  mediaFiles = [];

  lat: number
  lon: number
  total: string

  galery : GaleryModel;
  constructor(public geolocation: Geolocation,
    public mediaCapture: MediaCapture,
    public socialSharing: SocialSharing,
    public base : SQLite) {
    this.getGeolocation();
    this.galery = new GaleryModel();
   // this.openDb();
  }
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
      this.timestamp= (new Date(geoposition.timestamp)).toString();

    });
  }
  
  CaptureAudio(){
    this.mediaCapture.captureAudio().then((audio:MediaFile[])=>{
      this.ShareMedia("audio file capture by media capture plugin", "media capture", audio[0].fullPath,"");
    },(err)=>{
      alert(JSON.stringify(err));
    });
  }

  CaptureVideo(){
    this.mediaCapture.captureVideo().then((video:MediaFile[])=>{
      this.ShareMedia("video file capture by media capture plugin", "media capture", video[0].fullPath,"");
    },(err)=>{
      alert(JSON.stringify(err));
    });
  }

  CaptureImage(){
    this.mediaCapture.captureImage().then((image:MediaFile[])=>{
      this.ShareMedia("image file capture by media capture plugin", "media capture", image[0].fullPath,"");
    },(err)=>{
      alert(JSON.stringify(err));
    });
  }

  ShareMedia(message,subject,filepath,url){
    this.socialSharing.share(message,subject,filepath,url).then(()=>{

    },(err)=>{
      alert(JSON.stringify(err));
    });
  }

 
}
