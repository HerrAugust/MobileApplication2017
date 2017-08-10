


export class Disease {
    
    public icdcode: number = -1;
    public name: string = "";
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.icdcode = (typeof obj.icdcode === "number") ? obj.icdcode : this.icdcode;
            this.name = obj.name || this.name;
        }
    }
    
}