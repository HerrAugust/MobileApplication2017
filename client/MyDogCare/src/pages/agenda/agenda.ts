import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController, ItemSliding} from 'ionic-angular';

import {EventDetailPage} from '../event-detail/event-detail';
import {AddEditEventPage} from '../add-edit-event/add-edit-event';

//Providers
import {TaskProvider} from '../../providers/task.provider';
import {EventProvider} from '../../providers/event.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';

//Models
import {Task} from '../../models/task.model';
import {Event} from '../../models/event.model';

//Types
import {ReorderIndexes} from '../../types';

import { Events } from 'ionic-angular'; // needed for pop from AddEditEventPage

@IonicPage()
@Component({
    selector: 'page-agenda',
    templateUrl: 'agenda.html'
})
export class AgendaPage {

    events= []; // This is not precisely an Array<Event>, but an obj like [{"month": "July 2017", events:[{"code":"1", "note":"some note", "detailtimestamp":"2017-07-18 22:01:34.0"}]}], i.e. the events grouped by month
    public bAnimate: boolean = true;
    
    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public popevt: Events,
        public sTask: TaskProvider,
        public sEvent: EventProvider,
        public sDictionary: DictionaryService
    ) {
        console.log("AgendaPage()");
        this.sEvent.getEvents()
            .then(events => {
                this.events = events;
                console.log(this.events);
            });
        popevt.subscribe('event:created', (eventData) => {
            // eventData is an array of parameters, so grab our first and only arg
            this._manageNewEvent(eventData);
        });
        popevt.subscribe('event:modified', (eventData) => {
            this._manageEventModified(eventData);
        });
    }

    // Selects the next event
    ionViewDidLoad() {
        console.log("AgendaPage.ionViewDidLoad()");
        let element = document.getElementsByClassName('currentEvent')[0];
        console.log("element: "+element);
        //if(element)
            //this.content.scrollTo(0, element.scrollTop, 500); TODO
    };

    //called when you add an event. This adds it to the list
    _manageNewEvent(nullvar : any) {
        console.log("Agenda._manageNewEvent()");
        // refresh this.events, since events have just been modified
        this.events = [];
        this.events = this.sEvent.groupEvents();
        console.log("Agenda._manageNewEvent() END");
    }

    //called when you edit an event. This adds it to the list
    _manageEventModified(nullvar : any) {
        console.log("Agenda._manageEventModified()");
        // refresh this.events, since events have just been modified
        this.events = [];
        this.events = this.sEvent.groupEvents();
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

        this.navCtrl.push(AddEditEventPage, {'code': -1, 'actiontype': 'Save'});   
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
    
    deleteTask(e, event: Event, sliding: ItemSliding) {
        e.stopPropagation();

        this.alertCtrl.create({
            title: this.sDictionary.get("DELETE_EVENT"),
            inputs: [],
            buttons: [{
                text: this.sDictionary.get("CANCEL"),
                role: "cancel"
            }, {
                text: this.sDictionary.get("DELETE"), 
                handler: (data) => {
                    sliding.close();
                    this.sEvent.deleteEvent(event);
                }
            }]
        }).present();
    }

}
