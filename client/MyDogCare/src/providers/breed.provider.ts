import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models 
import {Breed} from '../models/breed.model';

//Constants
import {URL_BASE, URL} from '../constants';

//Types
import {ResponseServer} from '../types';

@Injectable()
export class BreedProvider {

    private _breeds: Array<Breed> = null;

    constructor(
        private _http: Http
    ) {
        console.log('Hello BreedProvider');
    }

    /**
     * Gets breeds from server.
     */
    getBreeds(): Promise<Array<Breed>> {
        console.log("BreedProvider.getBreeds()");
        return new Promise((resolve) => {
            if (this._breeds === null) {
                this._breeds = [];

                this._http.get(URL_BASE + URL.BREEDS.GETALL).toPromise()
                    .then((res: Response) => {
                        const json = res.json() as ResponseServer;

                        if (json.result) {
                            const breeds = json.data;
                            for (let breed of breeds) {
                                this._breeds.push(new Breed(breed));
                            }
                            resolve(this._breeds);
                        } else {
                            resolve(this._breeds);
                        }
                    })
                    .catch(() => resolve(this._breeds));
            } else {
                resolve(this._breeds);
            }
        });
    }

    /**
     * Returns the disease corresponding to the icd_code.
     */
    getDisease(icdcode: number): Breed {
        return this._breeds.find(breed => breed.id === icdcode);
    }

}
