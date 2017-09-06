import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DogSearchPage} from './search';

import {DictionaryModule} from '../../modules/dictionary/dictionary.module';

@NgModule({
    declarations: [
        DogSearchPage,
    ],
    imports: [
        DictionaryModule,
        IonicPageModule.forChild(DogSearchPage),
    ],
    exports: [
        DogSearchPage
    ]
})
export class SearchModule {}
