import {Component, ElementRef} from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController} from 'ionic-angular';

//google
import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps';

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
    @ViewChild('map') mapElement: ElementRef;
    map: GoogleMap;

    constructor(public navCtrl: NavController, private _googleMaps: GoogleMaps){

    }

    ngAfterViweInit(){
        this.initMap();
    }

    initMap(){
        let element = this.mapElement.nativeElement;
        this.map = this._googleMaps.create(element)
    }
}
