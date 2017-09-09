import {Component} from '@angular/core';
import {IonicPage, App, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import * as moment from 'moment';

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

@IonicPage()
@Component({
    selector: 'page-profile',
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

    constructor(    
        public app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public sAccount: AccountProvider,
        public sDictionary: DictionaryService,
        public sBreed : BreedProvider,
        public sDog: DogProvider
    ) {
        this.user = this.sAccount.getUser();
        let dog = this.navParams.get("dog");
        this.dog = dog;

        //this.dog.date_birth = this._formatdate();
        
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

    _formatdate(){
        let d = new Date(this.dog.date_birth);
        return moment(d).format('DD-MM-YYYY');
    }
    
    


    dog_registration() {
        console.log("in dog registration");
        
        
            const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
            loading.present();
    

            this.dog = new Dog({'name': this.name, 'gender': this.gender, 'age': this.age, 'date_birth': this.date_birth, 'breed': this.breed});
            
            
            this.sDog.sendDog(this.dog, this.user.token)
                .then(() => {
                    loading.dismiss().then(() => {
                        const alert = this.alertCtrl.create({
                            title: this.sDictionary.get("APP_NAME"),
                            message: this.sDictionary.get("TEXT_SIGNUP_SUCCESS"),
                            buttons: [this.sDictionary.get("OK")]
                        });
                        alert.present();
                        alert.onDidDismiss(() => {
                            this.navCtrl.pop();
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
                });
                
    }
    
   

}
