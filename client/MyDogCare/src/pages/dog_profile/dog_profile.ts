import {Component} from '@angular/core';
import {IonicPage, App, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import * as moment from 'moment';

import {HomePage} from '../home/home';

//Providers
import {AccountProvider} from '../../providers/account.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';
import {DogProvider} from '../../providers/dog.provider'

//Models
import {User} from '../../models/user.model';
import {Dog} from '../../models/dog.model';

import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import {Language} from '../../modules/dictionary/types';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'dog_profile.html',
})
export class DogProfilePage {

    user: User;
    dog: Dog;
    dog1: Dog;
    dogss = [];    
    editable: boolean = false;
    languages: Language[] = [];
    preferredLanguage: string = "";
    isDisabled : boolean = false;

    gender : string = "M";
    collarId : number = null;
    age : number = null;
    name: string = "";
    date_birth : string = "";

    
    constructor(    
        public app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public sAccount: AccountProvider,
        public sDictionary: DictionaryService,
        public sDog: DogProvider,
        private _DomSanitizer: DomSanitizer
    ) {
        this.user = this.sAccount.getUser();
        let dog = this.navParams.get("dog");
        this.dog = dog;
        this.dog1 = dog;

        this.languages = this.sDictionary.getLanguages();
        this.preferredLanguage = this.sDictionary.getPreferredLanguage();

        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Settings');
    }

    dog_edit() {
        console.log("in dog edit");
        
            var collar = this.dog.collarid;
            //const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
            //loading.present();
            
            this.dog1 = new Dog({'name': this.dog.name, 'gender': this.dog.gender, 'age': this.dog.age, 'date_birth': this.dog.date_birth, 'id': this.dog.id, 'collarid': collar});
            
            this._validateForm().then(() => {

                    const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
                    loading.present();

                    this.sDog.editDog(this.dog1, this.user.token, collar)
                        .then(() => {
                            loading.dismiss().then(() => {
                                const alert = this.alertCtrl.create({
                                    title: this.sDictionary.get("APP_NAME"),
                                    message: this.sDictionary.get("DOG_UPDATE_SUCCESS"),
                                    buttons: [this.sDictionary.get("OK")]
                                });
                                alert.present();
                                this.navCtrl.pop();
                                alert.onDidDismiss(() => {
                                //this.navCtrl.pop();
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

    homeRedirection() {
        console.log("Redirection to home");
        this.navCtrl.push(HomePage);   
    }
    
  
    private _validateForm() {
        return new Promise((resolve, reject) => {
            let msg = "";
            let MESSAGE = "WARNING_SIGNUP_FIELD_EMPTY";
            if (this.dog1.name.trim() === "") {
                msg = this.sDictionary.get(MESSAGE);
            }

            if (this.dog1.age === -1) {
                msg = this.sDictionary.get(MESSAGE);
            } 
   
            if (msg !== "") {
                this.alertCtrl.create({
                    title: this.sDictionary.get("APP_NAME"),
                    message: msg,
                    buttons: [this.sDictionary.get("OK")]
                }).present();
                
                reject();
                return false;
            } else {
                resolve();
                return true;
            }
        });
    }
    

}
