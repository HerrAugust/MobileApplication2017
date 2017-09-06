import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController} from 'ionic-angular';

//Providers
import {DogProvider} from '../../providers/dog.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';

//Models
import {Dog} from '../../models/dog.model';

// Needed to select next event
import { ViewChild } from "@angular/core";
import { Content } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    dogs=[];
    public bAnimate: boolean = true;
    
    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public sDog: DogProvider,
        public sDictionary: DictionaryService
    ) {
        console.log("Home()");
        this.sDog.getDogs().then(dogs =>
            {
                this.dogs = dogs;
                console.log("got the following dogs:");
                console.log(this.dogs);
            });
      }

    ionViewDidLoad() {
    };

    goDogProfile($event, dog: Dog) {
        this.navCtrl.push('DogProfilePage', {'dog':dog});
    }
    goAgenda($event, dog: Dog) {
        console.log(dog)
        this.navCtrl.push('AgendaPage', { 'from': 'home', 'collarid': dog.collarid });
    }

}
