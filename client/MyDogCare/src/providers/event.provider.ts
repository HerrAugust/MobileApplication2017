import {Injectable} from '@angular/core';
import {reorderArray} from 'ionic-angular';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {ReorderIndexes} from '../types'; 

//Providers
import {AccountProvider} from './account.provider';

//Models 
import {Event} from '../models/Event.model';

//Constants
import {URL_BASE, URL} from '../constants';

//Types
import {ResponseServer} from '../types';

@Injectable()
export class EventProvider {

    private _Events: Array<Event> = null;
    private _GroupedEvents = null;

    constructor(
        private _http: Http,
        private _sAccount: AccountProvider
    ) {
        console.log('Hello Event Provider');

        this._sAccount.events.subscribe('user:logout', () => {
            this._Events = null;
        });
        
    }

    /**
     * Retrives Event from server.
     */
    getEvents(): Promise<Array<any>> {
        console.log("EventProvider.getEvents()");
        return new Promise((resolve) => {
            if (this._Events === null) {
                this._Events = [];

                // TODO rimettere commentato
                console.log(URL_BASE + URL.EVENTS.GETALL + '7272719208635713611' /*+ this._sAccount.getUser().token*/)
                this._http.get(URL_BASE + URL.EVENTS.GETALL  + '7272719208635713611' /*+ this._sAccount.getUser().token*/).toPromise()
                    .then((res: Response) => {
                        const json = res.json() as ResponseServer;

                        if (json.result) {
                            const Events = json.data;
                            for (let event of Events) {
                                console.log(event);
                                this._Events.push(new Event(event));
                            }
                            this._GroupedEvents = this.groupEvents();
                            resolve(this._GroupedEvents);
                        } else {
                            resolve(this._GroupedEvents);
                        }
                    })
                    .catch(() => resolve(this._GroupedEvents));
            } else {
                resolve(this._GroupedEvents);
            }
        });
    }

    /**
     * Ritorna il Event corrispondente all'id.
     */
    getEvent(code: number): Event {
        console.log("EventProvider.getEvent(). code="+code);
        return this._Events.find(Event => Event.code === code);
    }

    /**
     * Groups events per date (a date has events 1, 8, 9; another one events 2 and 3).
     */
    groupEvents() {
            console.log("EventProvider.groupEvents()");
            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var currentEvents = null;
            var currentDate : Date = null;
            var groupedEvents = [];
            var now : Date = new Date();
            var nextEventFound : boolean = false;

            for(var i = 0; i < this._Events.length; i++) {
                var date = new Date(this._Events[i].detailtimestamp_start);
                console.log(this._Events[i].detailtimestamp_start);
                if(currentDate === null || date.getMonth() != currentDate.getMonth() || date.getFullYear() != currentDate.getFullYear()) {
                    console.log("Going inside with date: " + date);
                    currentDate = date;
    
                    let newGroup = {
                        month: monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear(),
                        events: []
                    };
    
                    currentEvents = newGroup.events;
                    groupedEvents.push(newGroup);
 
                }
 
                var day = date.getDay() + " " + monthNames[date.getMonth()] + " " + date.getFullYear(); // 27 March 2017
                var hour = date.getHours() + ":" + date.getMinutes(); // 8:30
                var date_end = new Date(this._Events[i].detailtimestamp_end);
                hour = hour + "-" + date_end.getHours() + ":" + date_end.getMinutes();
                console.log(this._Events[i])
                if(this._Events[i]['vaccinevisit'] == 'visit') {
                    this._Events[i]['vaccinevisit_src'] = 'assets/images/doctor70x.png';
                }
                else {
                    this._Events[i]['vaccinevisit_src'] = 'assets/images/syringe70x.png';
                }
                this._Events[i]['day'] = day;
                this._Events[i]['hour'] = hour;
                // Selects only the next event of today (BEG sel next event)
                console.log("date=" + date.toISOString() + "; now="+now.toISOString());
                console.log("date day="+date.getDate() + "; now day="+now.getDate());
                this._Events[i]['coloured'] = !nextEventFound && date.getFullYear() >= now.getFullYear() && date.getMonth() >= now.getMonth() && date.getDay() >= now.getDay() && date.getHours() >= now.getHours();
                if(this._Events[i]['coloured'])
                    nextEventFound = true;
                // END sel next event
                currentEvents.push(this._Events[i]);
            }

            console.log("result: " + JSON.stringify(groupedEvents));
            return groupedEvents;

        }

    /**
     * Saves an event into server
     */
    saveEvent(event : Event): Promise<any> {
        if (event.code === -1) {
            return this._createEvent(event);
        } 
        
        return this._editEvent(event);
    }

    /**
     * Deletes an event from server
     */
    deleteEvent(event : Event): Promise<any> {
        return new Promise((resolve, reject) => {
            let index = this._Events.indexOf(event);
            if (index !== -1) {
                this._http.delete(URL_BASE + URL.EVENTS.EDIT + this._sAccount.getUser().token + "/" + event.code)
                    .toPromise()
                    .then((res: Response) => {
                        const json = res.json() as ResponseServer;

                        if (json.result) {
                            this._Events.splice(this._Events.indexOf(event), 1);
                            resolve();
                        } else {
                            reject();
                        }
                    });
            }
        });
    }

    /**
     * Toggles an event's star
     */
    toggleStar(eventcode: number) : Promise<any> {
        console.log("EventProvider.toggleStart()");
        return new Promise((resolve, reject) => {
            if (eventcode !== -1) {
                console.log(URL_BASE + URL.EVENTS.TOGGLESTAR + this._sAccount.getUser().token + "/" + eventcode);
                this._http.get(URL_BASE + URL.EVENTS.TOGGLESTAR + this._sAccount.getUser().token + "/" + eventcode)
                    .toPromise()
                    .then((res: Response) => {
                        const json = res.json() as ResponseServer;

                        if (json.result) {
                            resolve(true);
                        } else {
                            reject();
                        }
                    });
            }
        });
    }

    /* private functions */

    private _createEvent(newEvent: Event) {
        console.log("EventProvider._createEvent(). newEvent="+JSON.stringify(newEvent));
        return new Promise((resolve, reject) => {
            this._http.post(URL_BASE + URL.EVENTS.CREATE + this._sAccount.getUser().token, {
                note: newEvent.note,
                starred: newEvent.starred,
                detailtimestamp: newEvent.detailtimestamp_start,
                detailtimestamp_end: newEvent.detailtimestamp_end,
                vaccinevisit: newEvent.vaccinevisit,
                place: newEvent.place
            })
                .toPromise()
                .then((res: Response) => {
                    const json = res.json() as ResponseServer;

                    if (json.result) {
                        newEvent.code = json.data.code;
                        this._Events.unshift(newEvent);
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(() => {
                    reject();
                });
        });
    }

    private _editEvent(event: Event) {
        return new Promise((resolve, reject) => {
            this._http.put(URL_BASE + URL.EVENTS.EDIT + this._sAccount.getUser().token + "/" + event.code, {
                note: event.note,
                starred: event.starred,
                detailtimestamp_start: event.detailtimestamp_start,
                detailtimestamp_end: event.detailtimestamp_end,
                vaccinevisit: event.vaccinevisit,
                place: event.place
            })
                .toPromise()
                .then((res: Response) => {
                    const json = res.json() as ResponseServer;

                    if (json.result) {
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(() => {
                    reject();
                });
        });
    }


    }
