


export class Event {
    
    public code: number = -1;
    public note: string = "";
    public starred: boolean = false; // true if the star has been clicked
    public detailtimestamp_start: string = "";
    public detailtimestamp_end: string = "";
    public vaccinevisit: string = "";
    public place : string = "";
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.code = (typeof obj.code === "number") ? obj.code : this.code;
            this.note = obj.note || this.note;
            this.detailtimestamp_start = obj.detailtimestamp || this.detailtimestamp_start;
            this.detailtimestamp_end = obj.detailtimestamp_end || this.detailtimestamp_end;
            this.vaccinevisit = obj.vaccinevisit || this.vaccinevisit;
            this.starred = obj.starred || this.starred;
            this.place = obj.place || this.place;
        }
    }
    
}