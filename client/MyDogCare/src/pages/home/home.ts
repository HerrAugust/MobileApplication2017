import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController, Platform} from 'ionic-angular';

import {EventDetailPage} from '../event-detail/event-detail';
import {AddEditEventPage} from '../add-edit-event/add-edit-event';

//Models
import {Event} from '../../models/event.model';
import { Events } from 'ionic-angular'; // needed for pop from AddEditEventPage

//Providers
import {DogProvider} from '../../providers/dog.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';
import {EventProvider} from '../../providers/event.provider';

//Map
import {LatLng} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import {InAppBrowser} from '@ionic-native/in-app-browser';

//Models
import {Dog} from '../../models/dog.model';

// Needed to select next event
import { ViewChild } from "@angular/core";
import { Content } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

// Pages
import {DogRegistrationPage} from '../dog_registration/dog_registration';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    source = new LatLng(0, 0);
    destination = new LatLng(0, 0);
    dogs=[];
    public bAnimate: boolean = true;
    
    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public popevt: Events,
        public sDog: DogProvider,
        public sDictionary: DictionaryService,
        public geoloc: Geolocation,
        public platform: Platform,
        private _DomSanitizer: DomSanitizer,
    ) {
        console.log("Home()");  

        this.loaddogs();
      }

    ionViewDidLoad() {
    };

    loaddogs()
    {
        const loading = this.loadingCtrl.create({ content: this.sDictionary.get("LOADING_WAITING") });
        loading.present();
        this.sDog.getDogs().then(dogs =>
            {
                this.dogs = dogs;
                console.log("got the following dogs:");
                console.log(this.dogs);
                loading.dismiss();
            });
    }

    searchDog($event, dog: Dog) 
    {   
        this.geoloc.getCurrentPosition().then((resp) => {   
            this.source = new LatLng(resp.coords.latitude, resp.coords.longitude);
            this.destination.lat = this.source.lat+5;
            this.destination.lng = this.source.lng-12;
            this.platform.ready().then(() => {
                let browser = new InAppBrowser();
                browser.create("https://www.google.com/maps/dir/"+this.source.lat+","+this.source.lng+"/"+this.destination.lat+","+this.destination.lng+"/@"+this.source.lat+","+this.source.lng);
            });
         });
    }

    goAgenda($event, dog: Dog) {
        console.log(dog)
        this.navCtrl.push('AgendaPage', { 'from': 'home', 'dogid': dog.id });
    }


    addDog() {
        console.log("Home.addDog()");
        this.navCtrl.push(DogRegistrationPage);   
    }

    
    goDogProfile($event, dog: Dog) {
        this.navCtrl.push('DogProfilePage', {'dog':dog});
    }

}
