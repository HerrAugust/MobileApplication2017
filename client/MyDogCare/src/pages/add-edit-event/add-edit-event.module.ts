import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditEventPage } from './add-edit-event';

@NgModule({
  declarations: [
    AddEditEventPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditEventPage),
  ],
  exports: [
    AddEditEventPage
  ]
})
export class AddEditEventPageModule {}
