// Calendar made with https://github.com/twinssbc/Ionic2-Calendar
// For installation and guide please refer to that page.

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, MenuController  } from 'ionic-angular';
//import * as moment from 'moment';

//Pages
import {AgendaPage} from '../agenda/agenda';

//Providers
import {EventProvider} from '../../providers/event.provider';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  
   // It is an array that contains JSON objects with at least title: string, startTime: Date, endTime: Date, allDay: bool
  eventSource;
  viewTitle;
  // The used plugin has the problem that it doesn't distinguish between swipe and click, so this trick is used
  lock : boolean = false;

  isToday:boolean;
  calendar = {
      mode: 'month',
      currentDate: new Date(),
      dateFormatter: {
          formatMonthViewDay: function(date:Date) {
              return date.getDate().toString();
          },
          formatMonthViewDayHeader: function(date:Date) {
              return 'MonMH';
          },
          formatMonthViewTitle: function(date:Date) {
              return 'testMT';
          },
          formatWeekViewDayHeader: function(date:Date) {
              return 'MonWH';
          },
          formatWeekViewTitle: function(date:Date) {
              return 'testWT';
          },
          formatWeekViewHourColumn: function(date:Date) {
              return 'testWH';
          },
          formatDayViewHourColumn: function(date:Date) {
              return 'testDH';
          },
          formatDayViewTitle: function(date:Date) {
              return 'testDT';
          }
      }
  };

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController,
      private sEvent: EventProvider,
      public menuCtrl: MenuController
    )
  {
        let userid = this.navParams.get("userid");
        this.loadEvents(userid);
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  loadEvents(userid: number) {
      //this.eventSource = this.createRandomEvents();
      this.sEvent.getEvents_calendar(userid)
      .then(events => {
          this.eventSource = events;
      });
  }

  onViewTitleChanged(title) {
      this.viewTitle = title;
      this.lock = true;
      console.log("lock is true");
  }

  onEventSelected(event) {
      console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
      this.calendar.mode = mode;
  }

  today() {
      this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
      console.log("CalendarPage.onTimeSelected()");
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);

      if(this.lock) {
          console.log("lock is false. return");
          this.lock = false;
          return;
      }

      if(!this.menuCtrl.isOpen()) {
        this.navCtrl.push(AgendaPage, { 'from': 'CalendarPage', 'date': ev.selectedTime });
      }
  }

  onCurrentDateChanged(event:Date) {
    console.log("CalendarPage.onCurrentDateChanged()");
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
  }

  // debug function
  createRandomEvents() {
      var events = [];
      for (var i = 0; i < 50; i += 1) {
          var date = new Date();
          var eventType = Math.floor(Math.random() * 2);
          var startDay = Math.floor(Math.random() * 90) - 45;
          var endDay = Math.floor(Math.random() * 2) + startDay;
          var startTime;
          var endTime;
          if (eventType === 0) {
              startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
              if (endDay === startDay) {
                  endDay += 1;
              }
              endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
              events.push({
                  title: 'All Day - ' + i,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: true
              });
          } else {
              var startMinute = Math.floor(Math.random() * 24 * 60);
              var endMinute = Math.floor(Math.random() * 180) + startMinute;
              startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
              endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
              events.push({
                  title: 'Event - ' + i,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: false
              });
          }
      }
      return events;
  }

  onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
};

}
