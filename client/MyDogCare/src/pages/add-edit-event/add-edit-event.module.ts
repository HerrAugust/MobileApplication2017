import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditEventPage } from './add-edit-event';

import {DictionaryModule} from '../../modules/dictionary/dictionary.module';

@NgModule({
  declarations: [
    AddEditEventPage,
  ],
  imports: [
    DictionaryModule,
    IonicPageModule.forChild(AddEditEventPage),
  ],
  exports: [
    AddEditEventPage
  ]
})
export class AddEditEventPageModule {}
