import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController, ItemSliding} from 'ionic-angular';

import {EventDetailPage} from '../event-detail/event-detail';

//Providers
import {TaskProvider} from '../../providers/task.provider';
import {EventProvider} from '../../providers/event.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';

//Models
import {Task} from '../../models/task.model';
import {Event} from '../../models/event.model';

//Types
import {ReorderIndexes} from '../../types';

// Needed to select next event
import { ViewChild } from "@angular/core";
import { Content } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-agenda',
    templateUrl: 'agenda.html'
})
export class AgendaPage {
    @ViewChild(Content) content: Content;

    events= []; // This is not precisely an Array<Event>, but an obj like [{"month": "July 2017", events:[{"code":"1", "note":"some note", "detailtimestamp":"2017-07-18 22:01:34.0"}]}], i.e. the events grouped by month
    public bAnimate: boolean = true;
    
    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
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
    }

    // Selects the next event
    ionViewDidLoad() {
        console.log("AgendaPage.ionViewDidLoad()");
        let element = document.getElementsByClassName('currentEvent')[0];
        console.log("element: "+element);
        if(element)
            this.content.scrollTo(0, element.scrollTop, 500);
    };

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

        this.alertCtrl.create({
            title: this.sDictionary.get("NEW_TASk"),
            inputs: [{
                name: "task",
                type: "text"
            }],
            buttons: [{
                text: this.sDictionary.get("CANCEL"),
                role: "cancel"
            }, {
                text: this.sDictionary.get("ADD"),
                handler: (data) => {
                    const task = new Task({ text: data.task });
                    this.sTask.saveTask(task);
                }
            }]
        }).present();
    }
    
    editTask(task: Task, sliding: ItemSliding) {
        sliding.close();
        
        this.alertCtrl.create({
            title: this.sDictionary.get("EDIT_TASK"),
            inputs: [{
                name: "task",
                type: "text",
                value: task.text
            }],
            buttons: [{
                text: this.sDictionary.get("CANCEL"),
                role: "cancel"
            }, {
                text: this.sDictionary.get("EDIT"), 
                handler: (data) => {
                    task.text = data.task;
                    this.sTask.saveTask(task);
                }
            }]
        }).present();
    }
    
    toggleStateTask(task: Task) {
        task.completed = !task.completed;
        this.sTask.saveTask(task);
    }
    
    deleteTask(task: Task, sliding: ItemSliding) {
        sliding.close();
        
        this.sTask.deleteTask(task);
    }
    
    reorderEvents() {
        this.bAnimate = false;
        this.sEvent.groupEvents();
        
        setTimeout(() => {
            this.bAnimate = true;
        }, 300);
    }

}
