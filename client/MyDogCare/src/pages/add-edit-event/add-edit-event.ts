import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Providers
//import {EventProvider} from '../../providers/event.provider';

// Models
//import {Event} from '../../models/event.model';

/**
 * Generated class for the AddEditEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-edit-event',
  templateUrl: 'add-edit-event.html',
})
export class AddEditEventPage {

  public event = {
    vaccinevisit: 'visit',
    monthStarts: '1990-02-19',
    monthEnds: '1990-02-19',
    timeStarts: '08:00',
    timeEnds: '08:30'
  }

  code : number = -1; // default: new event
  place : string = "";
  starred : boolean = false;
  comment : string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams /*public sEvent : EventProvider*/) {
    console.log("AddEditEventPage()");

    var curdate = new Date();
    var curyear = curdate.getFullYear();
    var curmonth = curdate.getMonth().toString();
    if(curmonth.length == 1)
      curmonth = "0"+curmonth;
    var curday = curdate.getDate().toString();
    if(curday.length == 1)
      curday = "0"+curday;
    var month = `${curyear}-${curmonth}-${curday}`;
    this.event.monthStarts = month;
    this.event.monthEnds = month;

    var curtime = curdate.getHours()+1;
    this.event.timeStarts = `${curtime}:00`;
    this.event.timeEnds = `${curtime}:30`;

    console.log("cur="+JSON.stringify(this.event));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEditEventPage');
  }

  saveEvent() {
    console.log("AddEditEventPage.saveEvent()");
   /* var event : Event = new Event({code: this.code, note: this.comment, starred: false, place: this.place, vaccinevisit: this.event.vaccinevisit});
    this.sEvent.saveEvent(event);*/
    this.navCtrl.pop();
  }

}
