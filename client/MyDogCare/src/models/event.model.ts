


export class Event {
    
    public code: number = -1;
    public note: string = "";
    //public completed: boolean = false;
    public detailtimestamp: string = "";
    public vaccinevisit: string = "";
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.code = (typeof obj.code === "number") ? obj.code : this.code;
            this.note = obj.note || this.note;
            this.detailtimestamp = obj.detailtimestamp || this.detailtimestamp;
            this.vaccinevisit = obj.vaccinevisit || this.vaccinevisit;
        }
    }
    
}