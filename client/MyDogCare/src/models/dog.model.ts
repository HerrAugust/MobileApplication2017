import {Breed} from '../models/breed.model';


export class Dog {
    
    collarid: string = "";
    age: number = -1;
    name: string = "";
    gender: string = "";
    breed: Breed = null;
    
    
    constructor(obj?: any) {
        this.setObj(obj);
    }
    
    setObj(obj?: any) {
        if (obj) {
            this.collarid = obj.collarid || this.collarid;
            this.age = obj.age || this.age;
            this.name = obj.name || this.name;
            this.gender = obj.gender || this.gender;
            this.breed = obj.breed || this.breed;
        }
    }
    
}