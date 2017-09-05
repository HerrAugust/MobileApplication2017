import {Injectable} from '@angular/core';
import {reorderArray} from 'ionic-angular';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Events } from 'ionic-angular';

import {ReorderIndexes} from '../types'; 

//Providers
import {AccountProvider} from './account.provider';

//Models 
import {Dog} from '../models/dog.model';

//Constants
import {URL_BASE, URL} from '../constants';

//Types
import {ResponseServer} from '../types';

@Injectable()
export class DogProvider {

    private _Dogs: Array<Dog> = null;
    private _GroupedEvents = null;

    constructor(
        private _http: Http,
        private _sAccount: AccountProvider
    ) {
        console.log('Hello Dog Provider');
/*
        this._sAccount.dogs.subscribe('user:logout', () => {
            this._Dogs = null;
        });
*/        
    }

    /**
     * Retrives Dogs from server.
     */
    
    getDogs(): Promise<Array<Dog>> {
        console.log("DogProvider.getDogs()");
        return new Promise((resolve) => {
            if (this._Dogs === null) {
                this._Dogs = [];


                //console.log(URL_BASE + URL.DOGS.ALL + this._sAccount.getUser().token)
                this._http.get(URL_BASE + URL.DOGS.ALL + /*this._sAccount.getUser().token*/123456).toPromise()
                    .then((res: Response) => 
                    {
                        const json = res.json() as ResponseServer;

                        if (json.result) 
                        {
                            const Dogs = json.data;
                            console.log("SJDOIASJDOIA");
                            console.log(Dogs)
                            for (let dog of Dogs) 
                            {
                                console.log(dog);
                                this._Dogs.push(new Dog(dog));
                            }
                            console.log("sda")
                            console.log(this._Dogs);
                            resolve(this._Dogs);
                        } 
                        else 
                        {
                            resolve(this._Dogs);
                        }
                    })
                    .catch(() => resolve(this._Dogs));
            } 
            else 
            {
                resolve(this._Dogs);
            }
        });
    }

    /**
     * Ritorna il Event corrispondente all'id.
     */
    /*
    getDog(code: number): Dog {
        console.log("EventProvider.getEvent(). code="+code);
        return this._Dogs.find(Dog => Dog.code === code);
    }
    */
}