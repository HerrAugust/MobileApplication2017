import {Component, ViewChild } from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

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
        sAccount: AccountProvider,
        sDictionary: DictionaryService
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
                /*if (sAccount.isLogged()) {
                    this.rootPage = 'HomePage';
                } else {
                    this.rootPage = 'LoginPage';
                }*/
                //TODO remove when HomePage works
                this.rootPage = 'AgendaPage'; 
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

}

