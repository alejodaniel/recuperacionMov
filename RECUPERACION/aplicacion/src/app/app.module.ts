import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {MediaCapture} from '@ionic-native/media-capture/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {Media} from '@ionic-native/media/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/File/ngx';
import{SocialSharing} from '@ionic-native/social-sharing/ngx';
//import { Storage } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgIfContext } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
   Camera,
   File,
  // Storage,
  SocialSharing,
   FilePath,
   Media,
   WebView,
   MediaCapture,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
