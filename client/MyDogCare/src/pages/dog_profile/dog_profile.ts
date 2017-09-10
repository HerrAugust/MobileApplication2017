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

        //this.dog.date_birth = this._formatdate();

        this.languages = this.sDictionary.getLanguages();
        this.preferredLanguage = this.sDictionary.getPreferredLanguage();

        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Settings');
    }

    _formatdate(){
        if(this.dog == null)
        {
            return;
        }
        let d = new Date(this.dog.date_birth);
        return moment(d).format('DD-MM-YYYY');
    }

    dog_edit() {
        console.log("in dog edit");
        
            
            const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
            loading.present();
    
            this.dog = new Dog({'name': this.dog.name, 'gender': this.dog.gender, 'age': this.dog.age, 'date_birth': this.dog.date_birth});
            
            console.log(this.dog);
            /*
            this.sDog.editDog(this.dog, this.user.token, this.collarId)
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
              */  
                
    }

    homeRedirection() {
        console.log("Redirection to home");
        this.navCtrl.push(HomePage);   
    }
    
  

    

}
