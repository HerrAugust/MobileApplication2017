import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

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

    constructor(
        private _http: Http,
        private _sAccount: AccountProvider
    )
    {
        console.log('Hello Dog Provider'); 
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
}