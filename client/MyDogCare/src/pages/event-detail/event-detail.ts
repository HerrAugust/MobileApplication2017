import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AddEditEventPage} from '../add-edit-event/add-edit-event';

// Providers
import {EventProvider} from '../../providers/event.provider';

// Models
import {Event} from '../../models/event.model';


/**
 * Generated class for the EventDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  event : Event = null;
  imgsrc : string = "assets/images/syringe70x.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, public sEvent : EventProvider) {
    console.log("EventDetail()");
    var code = navParams.get("code");
    console.log("received code="+code);
    this.event = sEvent.getEvent(code);
    console.log("received event="+JSON.stringify(this.event));

    console.log(this.event.vaccinevisit);
    if(this.event.vaccinevisit === 'visit') {
      this.imgsrc = "assets/images/doctor70x.png";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  editEvent() {
    this.navCtrl.push(AddEditEventPage, {'code': this.event.code, 'actiontype': 'Modify'});
  }

  // user clicks on aside menu. see https://www.raymondcamden.com/2017/01/05/an-example-of-the-ionic-2-menu-component
  openPage(p) {
    console.log("EventDetailsPage.openPage().p="+p);
    // TODO
  }

}
