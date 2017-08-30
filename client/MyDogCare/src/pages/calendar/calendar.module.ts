import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';

import {DictionaryModule} from '../../modules/dictionary/dictionary.module';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    CalendarPage,
  ],
  imports: [
    DictionaryModule,
    NgCalendarModule,
    IonicPageModule.forChild(CalendarPage),
  ],
  exports: [
    CalendarPage
  ]
})
export class CalendarPageModule {}
