import {Component, ViewChild } from '@angular/core';
import {Platform, Nav, LoadingController, AlertController, App} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

//Providers
import {AccountProvider} from '../providers/account.provider';
import {DictionaryService} from '../modules/dictionary/providers/dictionary.service';

// Pages for menu
import {AgendaPage} from '../pages/agenda/agenda';
import {HomePage} from '../pages/home/home';
import {CalendarPage} from '../pages/calendar/calendar';
 
@Component({
    templateUrl: 'app.html',
    providers: [DictionaryService]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav; // needed for menu
    rootPage: any;

    pages: Array<{title: string, component: any}>; // needed for menu

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        public sAccount: AccountProvider,
        public sDictionary: DictionaryService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        protected app: App
    ) {
        this.pages = [
            { title: 'Homepage', component: HomePage },
            { title: 'Celendar', component: CalendarPage },
            { title: 'Agenda', component: AgendaPage }
        ];

        platform.ready().then(() => {
            let promises = [] as Promise<any>[];
            promises.push(sDictionary.load());
            promises.push(sAccount.initialize());

            Promise.all(promises).then(() => {
                if (sAccount.isLogged()) {
                    this.rootPage = 'HomePage';
                } else {
                    this.rootPage = 'LoginPage';
                }
                //this.rootPage = 'Page';
            });

            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    logout() {
        const loading = this.loadingCtrl.create({ content: this.sDictionary.get("LOADING_WAITING") });
        loading.present();
        this.sAccount.logout()
        .then(() => {
            console.log("logout");

            loading.dismiss().then(() => {
                this.app.getRootNav().setRoot('LoginPage');
            });
        })
        .catch((msg) => {
            msg = this.sDictionary.get("ERROR_LOGOUT");
            console.log("errore logout");

            loading.dismiss().then(() => {
                this.alertCtrl.create({
                    title: this.sDictionary.get("APP_NAME"),
                    message: msg,
                    buttons: [this.sDictionary.get("OK")]
                }).present();
            });
        });
    }

}
