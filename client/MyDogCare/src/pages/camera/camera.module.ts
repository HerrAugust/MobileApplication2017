import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CameraPage} from './camera';

import {DictionaryModule} from '../../modules/dictionary/dictionary.module';

@NgModule({
    declarations: [
        CameraPage,
    ],
    imports: [
        DictionaryModule,
        IonicPageModule.forChild(CameraPage),
    ],
    exports: [
        CameraPage
    ]
})
export class CameraPageModule {}
