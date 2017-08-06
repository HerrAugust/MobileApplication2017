import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDetailPage } from './event-detail';

import {DictionaryModule} from '../../modules/dictionary/dictionary.module';

@NgModule({
  declarations: [
    EventDetailPage,
  ],
  imports: [
    DictionaryModule,
    IonicPageModule.forChild(EventDetailPage),
  ],
  exports: [
    EventDetailPage
  ]
})
export class EventDetailPageModule {}
