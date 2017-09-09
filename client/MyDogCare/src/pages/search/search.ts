import {Component, ElementRef} from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController} from 'ionic-angular';

//google
import { GoogleMaps, GoogleMap, GoogleMapsEvent, CameraPosition, LatLng, Marker, MarkerIcon, MarkerOptions } from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';

//Providers
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';
//import { PhotoLibrary, LibraryItem } from '@ionic-native/photo-library';

// Needed to select next event
import { ViewChild } from "@angular/core";
import { Content } from 'ionic-angular';

@IonicPage()
@Component({ 
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class DogSearchPage {
    
    @ViewChild('map') mapElement: ElementRef;
    map: GoogleMap;

    constructor(public navCtrl: NavController, private _googleMaps: GoogleMaps, private _Geoloc: Geolocation){

    }

    ngAfterViweInit(){
        let loc: LatLng;
        this.initMap();


    this.map.one(GoogleMapsEvent.MAP_READY).then(() =>{
        this.getLocation().then( res => {
            
            this.getLocation().then( res => {
                loc = new LatLng(res.coords.latitude, res.coords.longitude);
                this.moveCamera(loc);

                this.createMarker(loc, "ciao").then((marker:Marker)=>{
                    marker.showInfoWindow();
                }).catch(err =>{console.log(err);});

            }).catch( err =>{console.log(err);});
        });
    });


    }

    getLocation(){
        return this._Geoloc.getCurrentPosition();
    }

    initMap(){
        let element = this.mapElement.nativeElement;
        this.map = this._googleMaps.create(element)
    }

    createMarker(loc: LatLng, title: string){
        let markerOptions: MarkerOptions = {
            position: loc,
            title: title
        };
        return this.map.addMarker(markerOptions);
    }

    moveCamera(loc: LatLng){
        let options: CameraPosition<LatLng> = {
            target:loc,
            zoom: 15,
            tilt: 10
        }
        this.map.moveCamera(options)
    }
}
