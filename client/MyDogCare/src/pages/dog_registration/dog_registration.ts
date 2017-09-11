import {Component} from '@angular/core';
import {IonicPage, App, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import * as moment from 'moment';

import {HomePage} from '../home/home';

//Providers
import {AccountProvider} from '../../providers/account.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';
import {BreedProvider} from '../../providers/breed.provider';
import {DogProvider} from '../../providers/dog.provider';

//Models
import {User} from '../../models/user.model';
import {Dog} from '../../models/dog.model';
import {Breed} from '../../models/breed.model';

//interfaces
import {DogRegistrationInterface} from '../../interfaces/dog-registration.interface';

import {Language} from '../../modules/dictionary/types';
import { Events } from 'ionic-angular'; // needed for pop from CameraPage

// Constants
import {DEFAULT_IMAGE} from '../../constants';

@IonicPage()
@Component({
    selector: 'page-registration',
    templateUrl: 'dog_registration.html',
})
export class DogRegistrationPage {

    user: User;
    dog: Dog;
    dogss = [];    
    editable: boolean = false;
    languages: Language[] = [];
    preferredLanguage: string = "";

    gender : string = "M";
    collarId : number = null;
    age : number = null;
    name: string = "";
    date_birth : string = "";

    breed_hidden : boolean = true;
    breed : Breed = new Breed({id: -1, name: 'None', origin: 'None'});
    breeds : Array<Breed> = [];
  
    picture: any = 'assets/images/germanflag.jpg';//DEFAULT_IMAGE; // in this app, a base64 image

    constructor(    
        public app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public sAccount: AccountProvider,
        public sDictionary: DictionaryService,
        public sBreed : BreedProvider,
        public sDog: DogProvider,
        public popevt: Events,
    ) {
        this.user = this.sAccount.getUser();
        let dog = this.navParams.get("dog");
        this.dog = dog;
        
        this.languages = this.sDictionary.getLanguages();
        this.preferredLanguage = this.sDictionary.getPreferredLanguage();    

        // Getting breeds
        this.sBreed.getBreeds()
        .then(breeds => {
        this.breeds = breeds;
        console.log("breeds:"+JSON.stringify(this.breeds));
        this.breed = this.breeds[0];
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Settings');
    }

    dog_registration() {
        console.log("in dog registration");
        
        const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
        loading.present();
    
        this.dog = new Dog({'name': this.name, 'collarId': this.collarId, 'gender': this.gender, 'age': this.age, 'date_birth': this.date_birth,'breed': this.breed, 'src': this.picture});
        
        this._validateForm().then(() => {

                const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
                loading.present();

                this.sDog.sendDog(this.dog, this.user.token, this.collarId, this.breed.id)
                    .then(() => {
                        loading.dismiss().then(() => {
                            const alert = this.alertCtrl.create({
                                title: this.sDictionary.get("APP_NAME"),
                                message: this.sDictionary.get("TEXT_SIGNUP_SUCCESS"),
                                buttons: [this.sDictionary.get("OK")]
                            });
                            
                            alert.present();
                            alert.onDidDismiss(() => {
                            });
                        });
                    })
                    .catch(msg => {
                        loading.dismiss();
                        this.alertCtrl.create({
                            title: this.sDictionary.get("APP_NAME"),
                            message: msg,
                            buttons: [this.sDictionary.get("OK")]
                        }).present();
                        this.homeRedirection();
                    });
        }).catch(() => {});
                
    }
    
    takePicture($event) {
        console.log("DogRegistration.takePicture()");
        this.popevt.subscribe('camera:taken', (eventData) => {
          this._managePicture(eventData);
        });
        this.navCtrl.push('CameraPage');
    }

    _managePicture(eventData) {
        console.log("DogRegistration._managePicture()");
        this.popevt.unsubscribe('camera:taken');
        this.picture = eventData;
    }

     homeRedirection() {
        console.log("Redirection to home");
        this.popevt.publish('dog:created', null);
        this.navCtrl.setRoot(HomePage);
        //this.navCtrl.pop();   
    }

    private _validateForm() {
        return new Promise((resolve, reject) => {
            let msg = "";
            let MESSAGE = "WARNING_SIGNUP_FIELD_EMPTY";
            if (this.dog.name.trim() === "") {
                msg = this.sDictionary.get(MESSAGE);
            }

            console.log(this.dog.age);
            if (this.dog.age === -1) {
                msg = this.sDictionary.get(MESSAGE);
            } 

            console.log(this.dog.collarid);
            if (this.dog.collarid === -1) {
                msg = this.sDictionary.get(MESSAGE);
            } 

            if (msg !== "") {
                this.alertCtrl.create({
                    title: this.sDictionary.get("APP_NAME"),
                    message: msg,
                    buttons: [this.sDictionary.get("OK")]
                }).present();
                
                reject();
            } else {
                resolve();
            }
        });
    }
}
