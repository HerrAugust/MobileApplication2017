import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DogProfilePage} from './dog_profile';

import {DictionaryModule} from '../../modules/dictionary/dictionary.module';

@NgModule({
    declarations: [
        DogProfilePage,
    ],
    imports: [
        DictionaryModule,
        IonicPageModule.forChild(DogProfilePage),
    ],
    exports: [
        DogProfilePage
    ]
})
export class ProfileModule {}
