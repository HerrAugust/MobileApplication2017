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
import {GoogleMaps} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import { CameraPreview } from '@ionic-native/camera-preview';
import {Diagnostic} from '@ionic-native/diagnostic';

//Providers
import {DogProvider} from '../providers/dog.provider';
import {AccountProvider} from '../providers/account.provider';
import {UserPersistanceProvider} from '../providers/user-persistance.provider';
import {EventProvider} from '../providers/event.provider';
import {DiseaseProvider} from '../providers/disease.provider';
import {BreedProvider} from '../providers/breed.provider';

// Pages
import {EventDetailPageModule} from '../pages/event-detail/event-detail.module';
import {AddEditEventPageModule} from '../pages/add-edit-event/add-edit-event.module';
import {CalendarPageModule} from '../pages/calendar/calendar.module';
import {HomeModule} from '../pages/home/home.module';
import {AgendaPageModule} from '../pages/agenda/agenda.module';
import {DogRegistrationPageModule} from '../pages/dog_registration/dog_registration.module';
import {CameraPageModule} from '../pages/camera/camera.module';
import {ProfileModule} from '../pages/profile/profile.module';

@NgModule({
    declarations: [
        MyApp,
        EventDetailPage,
   ],
    imports: [
        BrowserModule,
        HttpModule,
        DictionaryModule,
        IonicStorageModule.forRoot({
            name: '__mydogcare',
        }),
        IonicModule.forRoot(MyApp),
        AgendaPageModule,
        HomeModule,
        ProfileModule,
        CalendarPageModule,
        AddEditEventPageModule,
        DogRegistrationPageModule,
        EventDetailPageModule,
        CameraPageModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        GoogleMaps,
        Geolocation,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AccountProvider,
        UserPersistanceProvider,
        EventProvider,
        DiseaseProvider,
        BreedProvider,
        DogProvider,
        CameraPreview,
        Diagnostic,
    ]
})
export class AppModule {}
