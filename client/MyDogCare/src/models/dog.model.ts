import {Breed} from '../models/breed.model';


export class Dog {
    
    public collarid: number = -1;
    public age: number = -1;
    public name: string = "";
    public gender: string = "";
    public breed: Breed = null;
    
    
    constructor(obj?: any) {
        this.setObj(obj);
    }
    
    setObj(obj?: any) {
        if (obj) {
            console.log(typeof obj.collarId === "number");
            console.log(obj.collarId)
            this.collarid = (typeof obj.collarId === "number") ? obj.collarId : this.collarid;
            this.age = obj.age || this.age;
            this.name = obj.name || this.name;
            this.gender = obj.gender || this.gender;
            this.breed = obj.breed || this.breed;
        }
    }
    
}