import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';

import {DogRegistrationPage} from '../dog_registration/dog_registration';

//interfaces
import {UserSignupInterface} from '../../interfaces/user-signup.interface';

//Providers
import {AccountProvider} from '../../providers/account.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';


@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    user: UserSignupInterface;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public sAccount: AccountProvider,
        public loadingCtrl: LoadingController,
        public sDictionary: DictionaryService
    ) {
        this.user = {
            username: "",
            password: "",
            password2: "",
            firstname: "",
            lastname: "",
            email: ""
        };
        
        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Signup');
    }

    signup() {
        console.log(this.user);
        
        this._validate().then(() => {


            const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
            loading.present();
            
            this.sAccount.signup(this.user)
                .then(() => {
                    loading.dismiss().then(() => {
                        const alert = this.alertCtrl.create({
                            title: this.sDictionary.get("APP_NAME"),
                            message: this.sDictionary.get("TEXT_SIGNUP_SUCCESS"),
                            buttons: [this.sDictionary.get("OK")]
                        });
                        alert.present();
                        alert.onDidDismiss(() => {
                            //this.addDog();
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
        }).catch(() => {});
    }
    
    private _validate() {
        return new Promise((resolve, reject) => {
            let msg = "";
            let MESSAGE = "WARNING_SIGNUP_FIELD_EMPTY";
            if (this.user.username.trim() === "") {
                msg = this.sDictionary.get(MESSAGE);
            } 
            if (this.user.password.trim() === "") {
                msg = this.sDictionary.get(MESSAGE);
            } 
            if (this.user.password2.trim() === "") {
                msg = this.sDictionary.get(MESSAGE);
            }

            if(this.user.password != this.user.password2){
                msg = this.sDictionary.get("WARNING_SIGNUP_PASSWORD_WRONG");
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
