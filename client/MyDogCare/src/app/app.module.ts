import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';


import {HttpModule} from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';

//My Modules
import {DictionaryModule} from '../modules/dictionary/dictionary.module'

//Native Plugins
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

//Providers
import {AccountProvider} from '../providers/account.provider';
import {UserPersistanceProvider} from '../providers/user-persistance.provider';
import {TaskProvider} from '../providers/task.provider';
import {EventProvider} from '../providers/event.provider';
import {DiseaseProvider} from '../providers/disease.provider';

// Pages
import {EventDetailPage} from '../pages/event-detail/event-detail';
import {AddEditEventPage} from '../pages/add-edit-event/add-edit-event';
import {CalendarPage} from '../pages/calendar/calendar';

@NgModule({
    declarations: [
        MyApp,
        EventDetailPage,
        AddEditEventPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        DictionaryModule,
        IonicStorageModule.forRoot({
            name: '__todo_list_lezione',
        }),
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        EventDetailPage,
        AddEditEventPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AccountProvider,
        UserPersistanceProvider,
        TaskProvider,
        EventProvider,
        DiseaseProvider
    ]
})
export class AppModule {}