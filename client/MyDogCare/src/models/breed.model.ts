


export class Breed {
    
    id: number = -1;
    name: string = "";
    origin: string = "";
    
    
    constructor(obj?: any) {
        this.setObj(obj);
    }
    
    setObj(obj?: any) {
        if (obj) {
            this.id = obj.id || this.id;
            this.name = obj.name || this.name;
            this.origin = obj.origin || this.origin;
        }
    }
    
}