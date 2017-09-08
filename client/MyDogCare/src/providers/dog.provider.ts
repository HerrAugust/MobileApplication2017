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
     * Send data of dog towards the server.
     */
    sendDog(dog: Dog): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post(URL_BASE + URL.DOGS.DOGREGISTRATION, dog).toPromise()
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

    public editDog(dog: Dog) {
        console.log("DogProvider.editDog(). dog="+JSON.stringify(dog));
        return new Promise((resolve, reject) => {
            this._http.put(URL_BASE + URL.DOGS.EDIT + this._sAccount.getUser().token + "/" + dog.collarid, {
                age: dog.age,
                name: dog.name,
                gender: dog.gender,
                breedid: dog.breed.id,
                date_birth: dog.date_birth,
                src: dog.src
            })
                .toPromise()
                .then((res: Response) => {
                    const json = res.json() as ResponseServer;

                    if (json.result) {
                        event = json.data;
                        // TODO notify
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

    /**
     * Retrieves Dogs from server.
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