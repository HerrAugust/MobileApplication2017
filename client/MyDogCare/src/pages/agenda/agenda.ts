import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController, ItemSliding} from 'ionic-angular';

import {EventDetailPage} from '../event-detail/event-detail';
import {AddEditEventPage} from '../add-edit-event/add-edit-event';

//Providers
import {EventProvider} from '../../providers/event.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';

//Models
import {Event} from '../../models/event.model';

import { Events } from 'ionic-angular'; // needed for pop from AddEditEventPage

@IonicPage()
@Component({
    selector: 'page-agenda',
    templateUrl: 'agenda.html'
})
export class AgendaPage {

    events= []; // This is not precisely an Array<Event>, but an obj like [{"month": "July 2017", events:[{"code":"1", "note":"some note", "detailtimestamp":"2017-07-18 22:01:34.0"}]}], i.e. the events grouped by month
    public bAnimate: boolean = true;
    dogid: number = -1;

    fromCalendar : boolean = false
    
    constructor(
        public navCtrl: NavController,
        public navParam: NavParams,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public popevt: Events,
        public sEvent: EventProvider,
        public sDictionary: DictionaryService,
    ) {
        console.log("AgendaPage()");
        this.dogid  = this.navParam.get("dogid");
        console.log('dogid='+this.dogid);
        let date = this.navParam.get("date");
        if(!date) date = null;
        console.log("date="+date)
        let userid = this.navParam.get("userid");
        let from : string = this.navParam.get("from");
        this.fromCalendar = from == 'CalendarPage' ? true : false;
        // the function this.sEvent.getEvents() expects all, by dog or by date as param, thus:
        switch(String(from)) {
            case 'CalendarPage':
                from = 'by date';
                break;
            case 'undefined': // Agenda clicked in menu
                from = 'all';
                break;
            case 'HomePage':
                from = 'by dog';
                break;
        }
        console.log("from="+from)

        const loading = this.loadingCtrl.create({ content: this.sDictionary.get("LOADING_WAITING") });
        loading.present();
        this.sEvent.getEvents(from, this.dogid, date, userid)
            .then(events => {
                this.events = events;
                console.log(this.events);
                //console.log("length: " + this.events.length);
                loading.dismiss();
            });

        if(from != 'CalendarPage') {
            popevt.subscribe('event:created', (eventData) => {
                // eventData is an array of parameters, so grab our first and only arg
                this._manageNewEvent(eventData);
            });
            popevt.subscribe('event:modified', (eventData) => {
                this._manageEventModified(eventData);
            });
            popevt.subscribe('event:deleted', (eventData) => {
                this._manageEventDeleted(eventData);
            });
        }
    }

    // Selects the next event
    ionViewDidLoad() {
        console.log("AgendaPage.ionViewDidLoad()");
    };

    //called when you add an event. This adds it to the list
    _manageNewEvent(nullvar : any) {
        console.log("Agenda._manageNewEvent()");
        // refresh this.events, since events have just been modified
        this.events = [];
        this.events = this.sEvent.groupEvents();
        this.popevt.unsubscribe("event:create");
        console.log("Agenda._manageNewEvent() END");
    }

    //called when you delete an event. This refreshes the list of events
    _manageEventDeleted(nullvar : any) {
        console.log("Agenda._manageEventDeleted()");
        // refresh this.events, since events have just been modified
        this.events = [];
        this.events = this.sEvent.groupEvents();
        this.popevt.unsubscribe("event:deleted");
        console.log("Agenda._manageEventDeleted() END");
    }

    //called when you edit an event. This adds it to the list
    _manageEventModified(nullvar : any) {
        console.log("Agenda._manageEventModified()");
        // refresh this.events, since events have just been modified
        this.events = [];
        this.events = this.sEvent.groupEvents();
        this.popevt.unsubscribe("event:modified");
        console.log("Agenda._manageEventModified() END");
    }

    openDetails(event) {
        console.log("AgendaPage.openDetails()");
        if(event) {
            var code : number = event.code;
            console.log("here. code="+code);
            this.navCtrl.push(EventDetailPage, { 'code': code });
        }
    }
    
    addEvent(e) {
        console.log("AgendaPage.addEvent()");
        e.stopPropagation();

        console.log("dogid="+this.dogid);
        this.navCtrl.push(AddEditEventPage, {'code': -1, 'actiontype': 'Save', 'dogid': this.dogid});   
    }
    
    editEvent(e, event: Event) {
        console.log("AgendaPage.editEvent()");
        console.log("event code="+event.code);
        e.stopPropagation();

        this.navCtrl.push(AddEditEventPage, {'code': event.code, 'actiontype': 'Modify'});
    }
    
    toggleStarEvent(e, event: Event) {
        console.log("AgendaPage.toggleStarEvent()");
        e.stopPropagation();
        var eventcode = event.code;
        console.log("eventcode="+eventcode);
        this.sEvent.toggleStar(eventcode)
            .then(res => {
                console.log(res);
                if(res === true) {
                    event.starred = !event.starred;
                }
            });
    }
    
    deleteEvent(e, event: Event, sliding: ItemSliding) {
        e.stopPropagation();

        this.alertCtrl.create({
            title: this.sDictionary.get("AGENDAPAGE_DELETE_EVENT"),
            inputs: [],
            buttons: [{
                text: this.sDictionary.get("CANCEL"),
                role: "cancel"
            }, {
                text: this.sDictionary.get("DELETE"), 
                handler: (data) => {
                    this.sEvent.deleteEvent(event);
                }
            }]
        }).present();
    }

}
