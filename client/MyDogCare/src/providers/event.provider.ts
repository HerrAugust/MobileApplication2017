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
     * Recupera i Event dal server.
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
        return this._Events.find(Event => Event.code === code);
    }

    /**
     * Groups events in the way needed per date.
     */
    groupEvents() {
            console.log("EventProvider.groupEvents()");
            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var currentEvents = null;
            var currentDate : Date = null;
            var groupedEvents = [];

            for(var i = 0; i < this._Events.length; i++) {
                var date = new Date(this._Events[i].detailtimestamp);
                console.log(this._Events[i].detailtimestamp);
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
                var hour = date.getHours() + ":" + date.getMinutes(); // 8:30 AM
                console.log(this._Events[i])
                if(this._Events[i]['vaccinevisit'] == 'visit') {
                    this._Events[i]['vaccinevisit'] = 'assets/images/doctor70x.png';
                }
                else {
                    this._Events[i]['vaccinevisit'] = 'assets/images/syringe70x.png';
                }
                this._Events[i]['day'] = day;
                this._Events[i]['hour'] = hour;
                currentEvents.push(this._Events[i]);
            }

            console.log("result: " + JSON.stringify(groupedEvents));
            return groupedEvents;

        }
    }
