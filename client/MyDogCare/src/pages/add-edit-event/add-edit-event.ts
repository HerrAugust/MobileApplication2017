import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Providers
import {EventProvider} from '../../providers/event.provider';
import {DiseaseProvider} from '../../providers/disease.provider';

// Models
import {Event} from '../../models/Event.model';
import {Disease} from '../../models/disease.model';

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

  diseases_hidden : boolean = true;
  disease : Disease = new Disease({icdcode: -1, name: 'None'});
  diseases : Array<Disease> = [];

  actiontype : string = "Save";

  constructor(public navCtrl: NavController, public navParams: NavParams, public sEvent : EventProvider, public sDisease : DiseaseProvider) {
    console.log("AddEditEventPage()");

    this.actiontype = navParams.get("actiontype");

    this.code = navParams.get("code");

    if(this.code == -1) { // add event clicked
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
    }
    else { //edit clicked
      var curevent = sEvent.getEvent(this.code);
      // TODO
      var date = new Date(curevent.detailtimestamp_start);
      var curyear = date.getFullYear();
      var curmonth = date.getMonth().toString();
      if(curmonth.length == 1)
        curmonth = "0"+curmonth;
      var curday = date.getDate().toString();
      if(curday.length == 1)
        curday              = "0"+curday;
      var month             = `${curyear}-${curmonth}-${curday}`;
      this.event.monthStarts = month;
      this.event.monthEnds  = month;

      var curtime           = date.getHours()+1;
      this.event.timeStarts = `${curtime}:00`;
      this.event.timeEnds   = `${curtime}:30`;
      this.comment          = curevent.note;
      if(this.event.vaccinevisit == 'vaccine') {
        this.disease          = curevent.type;
        this.diseases_hidden  = false;
      }
      this.place              = curevent.place;
      this.event.vaccinevisit = curevent.vaccinevisit;
    }

    console.log("cur="+JSON.stringify(this.event));

    // Getting diseases
    this.sDisease.getDiseases()
            .then(diseases => {
              this.diseases = diseases;
              console.log("diseases:"+JSON.stringify(this.diseases));
              this.disease = this.diseases[0];
            });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEditEventPage');
  }

  saveEvent() {
    console.log("AddEditEventPage.saveEvent()");

    console.log(JSON.stringify(this.event));
    var dt_end = this.event.monthEnds + " " + this.event.timeEnds + ":00";
    var dt_start = this.event.monthStarts + " " + this.event.timeStarts + ":00";
    console.log(this.disease);
    var event : Event = new Event({code: this.code, type: this.event.vaccinevisit == 'vaccine' ? this.disease : null, detailtimestamp_end: dt_end, detailtimestamp: dt_start, note: this.comment, starred: this.starred, place: this.place, vaccinevisit: this.event.vaccinevisit});
    console.log("saving event="+JSON.stringify(event));
    this.sEvent.saveEvent(event);

    this.navCtrl.pop();
  }

  visitvaccine_changed(evt) {
    console.log("AddEditEventPage.visitvaccine_changed(). evt="+evt);
    if(evt == 'vaccine')
      this.diseases_hidden = false;
    else
      this.diseases_hidden = true;
  }

}
