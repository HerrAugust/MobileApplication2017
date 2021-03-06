import {Breed} from '../models/breed.model';


export class Dog {
    
    public id : number = -1;
    public collarid: number = -1;
    public age: number = -1;
    public name: string = "";
    public gender: string = "";
    public breed: number = -1;
    public date_birth: string = null;
    public src: string = "";
    
    
    constructor(obj?: any) {
        this.setObj(obj); 
    }
    
    setObj(obj?: any) {
        if (obj) {
            console.log(obj.collarId)
            this.id = obj.id || this.id;
            this.collarid = obj.collarId || this.collarid;
            this.age = obj.age || this.age;
            this.name = obj.name || this.name;
            this.gender = obj.gender || this.gender;
            this.breed = obj.breed || this.breed;
            this.date_birth = obj.date_birth || this.date_birth;
            this.src = obj.src || this.src;
        }
    }
    
}