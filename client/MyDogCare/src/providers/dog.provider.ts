import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Providers
import {AccountProvider} from './account.provider';

//Models 
import {Dog} from '../models/dog.model';
import {User} from '../models/user.model';

//Constants
import {URL_BASE, URL} from '../constants';

//Types
import {ResponseServer} from '../types';

import {DictionaryService} from '../modules/dictionary/providers/dictionary.service';

@Injectable()
export class DogProvider {

    private _Dogs: Array<Dog> = null;

    constructor(
        private _http: Http,
        private _sAccount: AccountProvider,
        private _sDict: DictionaryService,
    )
    {
        console.log('Hello Dog Provider'); 
    }


    /**
     * Send data of dog towards the server.
     */
    sendDog(dog: Dog, token: String, collarid: number, breed: number): Promise<any> {
        console.log("DogProvider.sendDog()"); 
        return new Promise((resolve, reject) => {
            this._http.post(URL_BASE + URL.DOGS.DOGREGISTRATION + this._sAccount.getUser().token+'/'+collarid+'/'+breed, dog).toPromise()
                .then((res: Response) => {
                    const json = res.json() as ResponseServer;
                    
                    if (json.result) {
                        resolve();
                    } else {
                        reject(json.message);
                    }
                })
                .catch((err: Response) => reject(`Error status: ${err.status}`));
        });
    }

    /**
     * Retrieves Dogs from server.
     */
    
    getDogs(): Promise<Array<Dog>> {
        console.log("DogProvider.getDogs()");
        return new Promise((resolve) => {
            this._Dogs = [];

            this._http.get(URL_BASE + URL.DOGS.ALL + this._sAccount.getUser().token).toPromise()
                .then((res: Response) => 
                {
                    const json = res.json() as ResponseServer;

                    if (json.result) 
                    {
                        const Dogs = json.data;
                        for (let dog of Dogs) 
                        {
                            console.log(dog);
                            this._Dogs.push(new Dog(dog));
                        }
                        resolve(this._Dogs);
                    } 
                    else 
                    {
                        Promise.reject(this._sDict.get("ERROR_GET_DOGS"));
                    }
                })
                .catch((err: Response) => Promise.reject(`Errore status: ${err.status}`));
        });
    }

    /**
     * Send data of dog towards the server (Update profile).
     */
    editDog(dog: Dog, token: String, collarid: number): Promise<any> {
        console.log("Sono dentro la edit:" + collarid);

        
        return new Promise((resolve, reject) => {
            this._http.put(URL_BASE + URL.DOGS.DOGEDIT + this._sAccount.getUser().token+'/'+collarid, dog).toPromise()
                .then((res: Response) => {
                    const json = res.json() as ResponseServer;
                    
                    if (json.result) {
                        resolve();
                    } else {
                        reject(json.message);
                    }
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });
        
    }

}