import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models 
import {Disease} from '../models/disease.model';

//Constants
import {URL_BASE, URL} from '../constants';

//Types
import {ResponseServer} from '../types';

@Injectable()
export class DiseaseProvider {

    private _diseases: Array<Disease> = null;

    constructor(
        private _http: Http
    ) {
        console.log('Hello Disease Provider');
    }

    /**
     * Gets diseases from server.
     */
    getDiseases(): Promise<Array<Disease>> {
        console.log("Diseases.getDiseases()");
        return new Promise((resolve) => {
            if (this._diseases === null) {
                this._diseases = [];

                this._http.get(URL_BASE + URL.DISEASES.GETALL).toPromise()
                    .then((res: Response) => {
                        const json = res.json() as ResponseServer;

                        if (json.result) {
                            const diseases = json.data;
                            for (let disease of diseases) {
                                this._diseases.push(new Disease(disease));
                            }
                            resolve(this._diseases);
                        } else {
                            resolve(this._diseases);
                        }
                    })
                    .catch(() => resolve(this._diseases));
            } else {
                resolve(this._diseases);
            }
        });
    }

    /**
     * Returns the disease corresponding to the icd_code.
     */
    getDisease(icdcode: number): Disease {
        return this._diseases.find(disease => disease.icdcode === icdcode);
    }

}
