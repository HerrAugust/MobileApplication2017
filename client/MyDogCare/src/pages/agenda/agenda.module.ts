import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaPage } from './agenda'

import {DictionaryModule} from '../../modules/dictionary/dictionary.module';

@NgModule({
  declarations: [
    AgendaPage
  ],
  imports: [
    DictionaryModule,
    IonicPageModule.forChild(AgendaPage),
  ],
  exports: [
    AgendaPage
  ]
})
export class AgendaPageModule {}
