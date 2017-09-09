import {Breed} from '../models/breed.model';


export class Dog {
    
    public collarid: number = -1;
    public age: number = -1;
    public name: string = "";
    public gender: string = "";
    public breed: Breed = null;
    public date_birth: string = null;
    public src: string = "";
    
    
    constructor(obj?: any) {
        this.setObj(obj);
    }
    
    setObj(obj?: any) {
        if (obj) {
            this.collarid = obj.collarId;
            this.age = obj.age || this.age;
            this.name = obj.name || this.name;
            this.gender = obj.gender || this.gender;
            this.breed = obj.breed || this.breed;
            this.date_birth = obj.date_birth || this.date_birth;
            this.src = obj.src || this.src;
        }
    }
    
}