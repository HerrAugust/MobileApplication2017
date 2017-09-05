import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController, ItemSliding} from 'ionic-angular';

//Providers
import {TaskProvider} from '../../providers/task.provider';
import {DogProvider} from '../../providers/dog.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';

//Models
import {Task} from '../../models/task.model';
import {Event} from '../../models/event.model';
import {Dog} from '../../models/dog.model';

//Types
import {ReorderIndexes} from '../../types';

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
        public sTask: TaskProvider,
        public sDog: DogProvider,
        public sDictionary: DictionaryService
    ) {
        console.log("Home()");
        this.sDog.getDogs().then(dogs => {this.dogs = dogs;
                                            console.log("qui");
                                          console.log(this.dogs);
                                         }
                                );
      }

    ionViewDidLoad() {
    };

    goDogProfile(dog: Dog) {
        this.navCtrl.push('DogProfilePage', {'dog':dog});
    }
    goAgenda() {
        this.navCtrl.push('AgendaPage');
    }

}
