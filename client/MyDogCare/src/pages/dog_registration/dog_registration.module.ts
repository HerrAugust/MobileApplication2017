import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DogRegistrationPage} from './dog_registration';

import {DictionaryModule} from '../../modules/dictionary/dictionary.module';

@NgModule({
    declarations: [
        DogRegistrationPage,
    ],
    imports: [
        DictionaryModule,
        IonicPageModule.forChild(DogRegistrationPage),
    ],
    exports: [
        DogRegistrationPage
    ]
})
export class DogRegistrationPageModule {}
