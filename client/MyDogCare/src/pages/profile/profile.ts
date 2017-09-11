import {Component} from '@angular/core';
import {IonicPage, App, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';

//Providers
import {AccountProvider} from '../../providers/account.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';

//Models
import {User} from '../../models/user.model';
import {HomePage} from '../home/home';

import {Language} from '../../modules/dictionary/types';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    user: User;
    editable: boolean = false;
    languages: Language[] = [];
    preferredLanguage: string = "";
    
    constructor(
        public app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public sAccount: AccountProvider,
        public sDictionary: DictionaryService
    ) {
        this.user = this.sAccount.getUser();
        
        this.languages = this.sDictionary.getLanguages();
        this.preferredLanguage = this.sDictionary.getPreferredLanguage();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Settings');
    }

    onChangeLanguage() {
        const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
        loading.present();
        
        this.sDictionary.setPreferredLanguage(this.preferredLanguage)
            .then(() => {
                loading.dismiss().then(() => {
                    this.app.getRootNav().setRoot('TabsPage');
                });
            })
            .catch(() => {
                console.log("Errore nel caricamento del dizionario");
                loading.dismiss();
            });
    }
    
    profile_edit() {

            const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
            loading.present();
    
            this.user = new User({'username': this.user.username, 'firstname': this.user.firstname, 'lastname': this.user.lastname, 'email': this.user.email});

            this.sAccount.update(this.user)
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
            }

    homeRedirection() 
    {
        console.log("Redirection to home");
        this.navCtrl.push(HomePage);   
    }

}
