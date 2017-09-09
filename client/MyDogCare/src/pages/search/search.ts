import {Component, ElementRef} from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController, Platform} from 'ionic-angular';

//google
import { GoogleMaps, GoogleMap, GoogleMapsEvent, CameraPosition, LatLng, Marker, MarkerIcon, MarkerOptions } from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import {InAppBrowser} from '@ionic-native/in-app-browser';

//Providers
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';

// Needed to select next event
import { ViewChild } from "@angular/core";
import { Content } from 'ionic-angular';

@IonicPage()
@Component({ 
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class DogSearchPage {

    location = new LatLng(0, 0);
    //constructor(public navCtrl: NavController, public google: GoogleMaps, public _Geoloc: Geolocation){}
    constructor( public platform: Platform,public navCtrl: NavController, private geoloc: Geolocation) {
        
    }

loc()
{
    this.geoloc.getCurrentPosition().then((resp) => {   
        this.location = new LatLng(resp.coords.latitude, resp.coords.longitude);
        console.log(resp.coords.latitude);
        console.log("separatore");
        console.log(resp.coords.longitude);
    });

    //Object { lat: 42.368686499999995, lng: 13.350678199999999 }
    //return "ma vaffanculo!";
}

    openUrl() {
        
                this.platform.ready().then(() => {
                    let browser = new InAppBrowser();
                    browser.create("https://www.google.it/maps/dir/42.3690844,13.3576909/42.3735866,13.350009/@42.3677845,13.3517685,15z");
                });
        }

}