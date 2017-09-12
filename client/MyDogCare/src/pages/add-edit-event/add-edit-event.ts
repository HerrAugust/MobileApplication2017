import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

// Providers
import {EventProvider} from '../../providers/event.provider';
import {DiseaseProvider} from '../../providers/disease.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';

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

  dogid: number = -1;

  actiontype : string = "Save";
  title : string = "New Event";

  constructor(public navCtrl: NavController, public sDictionary: DictionaryService, public navParams: NavParams, public sEvent : EventProvider, public sDisease : DiseaseProvider, private alertCtrl: AlertController) {
    console.log("AddEditEventPage()");

    this.actiontype = sDictionary.get("ADDEDITEVENTPAGE_" + (<string> navParams.get("actiontype")).toUpperCase());
    this.code = navParams.get("code");

    this.dogid = navParams.get("dogid");
    console.log("dogid="+this.dogid);

    // Getting diseases
    this.sDisease.getDiseases()
    .then(diseases => {
      this.diseases = diseases;
      console.log("diseases:"+JSON.stringify(this.diseases));
      if(this.code == -1) // for edit event, it is already set
        this.disease = this.diseases[0];
      console.log("disease: "+JSON.stringify(this.disease));
    });

    if(this.code == -1) { // add event clicked
      var curdate = new Date();
      var curyear = curdate.getFullYear();
      var curmonth = (curdate.getMonth()+1).toLocaleString();
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

      this.title = this.sDictionary.get('ADDEDITEVENTPAGE_TITLE_NEWEVENT');
    }
    else { //edit clicked
      // set date start
      var curevent            = sEvent.getEvent(this.code);
      var date                = new Date(curevent.detailtimestamp_start);
      var curyear             = date.getFullYear();
      var curmonth            = (date.getMonth()+1).toString();
      if(curmonth.length == 1)
        curmonth              = "0"+curmonth;
      var curday              = curevent.detailtimestamp_start.split(' ')[0].split('-')[2];
      if(curday.length == 1)
        curday                = "0"+curday;
      var month               = `${curyear}-${curmonth}-${curday}`;
      this.event.monthStarts  = month;

      //set date end
      var date_end            = new Date(curevent.detailtimestamp_end);
      var curyear_end             = date_end.getFullYear();
      var curmonth_end            = (date_end.getMonth()+1).toString();
      if(curmonth_end.length == 1)
        curmonth_end              = "0"+curmonth_end;
      var curday_end              = curevent.detailtimestamp_end.split(' ')[0].split('-')[2];
      if(curday_end.length == 1)
        curday_end                = "0"+curday_end;
      var month_end               = `${curyear_end}-${curmonth_end}-${curday_end}`;
      this.event.monthEnds    = month_end;

      //set times
      var curtime_start       = date.getHours().toString();
      if(curtime_start.length == 1)
        curtime_start         = "0"+curtime_start;
      var curtime_end         = date_end.getHours().toString();
      if(curtime_end.length == 1)
        curtime_end           = "0"+curtime_end;
      var curmin_start        = date.getMinutes().toString();
      if(curmin_start.length == 1)
        curmin_start          = "0"+curmin_start;
      var curmin_end          = date_end.getMinutes().toString();
      if(curmin_end.length == 1)
        curmin_end            = "0"+curmin_end;
      this.event.timeStarts   = `${curtime_start}:${curmin_start}`;
      this.event.timeEnds     = `${curtime_end}:${curmin_end}`;
      this.comment            = curevent.note;
      console.log(JSON.stringify(curevent))
      if(curevent.vaccinevisit == 'vaccine') {
        this.disease          = curevent.type;
        this.diseases_hidden  = false;
      }
      this.place              = curevent.place;
      this.event.vaccinevisit = curevent.vaccinevisit;

      this.title = this.sDictionary.get('ADDEDITEVENTPAGE_TITLE_EDITEVENT');
    }

    console.log("cur="+JSON.stringify(this.event));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEditEventPage');
  }

  saveEvent() {
    console.log("AddEditEventPage.saveEvent()");

    let temp = this.event.monthStarts.split('-');
    let temp2 = this.event.timeStarts.split(':');
    let date_start =  new Date(parseInt(temp[0]), parseInt(temp[1]), parseInt(temp[2]), parseInt(temp2[0]), parseInt(temp2[1]));
    temp = this.event.monthEnds.split('-');
    temp2 = this.event.timeEnds.split(':');
    let date_end = new Date(parseInt(temp[0]), parseInt(temp[1]), parseInt(temp[2]), parseInt(temp2[0]), parseInt(temp2[1]));
    console.log("date_start & date_end: "+date_start +"; "+date_end + "; <=:"+(date_end <= date_start) );
    if(date_end <= date_start) {
      this.alertCtrl.create({
        title: this.sDictionary.get("ADDEDITEVENTPAGE_DATE_ERROR_TITLE"),
        subTitle: this.sDictionary.get("ADDEDITEVENTPAGE_DATE_ERROR_SUB"),
        buttons: ['0K']
      }).present();
      return;
    }

    console.log(JSON.stringify(this.event));
    var dt_end = this.event.monthEnds + " " + this.event.timeEnds + ":00";
    var dt_start = this.event.monthStarts + " " + this.event.timeStarts + ":00";
    console.log(this.disease);
    var event : Event = new Event({code: this.code, type: this.event.vaccinevisit == 'vaccine' ? this.disease : null, detailtimestamp_end: dt_end, detailtimestamp: dt_start, note: this.comment, starred: this.starred, place: this.place, vaccinevisit: this.event.vaccinevisit});
    console.log("saving event="+JSON.stringify(event));
    this.sEvent.saveEvent(event, this.dogid);

    this.navCtrl.pop();
  }

  visitvaccine_changed(evt) {
    console.log("AddEditEventPage.visitvaccine_changed(). evt="+evt);
    if(evt == this.sDictionary.get('VACCINE').toLowerCase())
      this.diseases_hidden = false;
    else
      this.diseases_hidden = true;
  }

}
