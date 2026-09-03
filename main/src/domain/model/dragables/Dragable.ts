export class Dragable {
    constructor(id: string, durationInMinutes: number){
        this.id = id;
        this.duration = durationInMinutes;
    }
    getId(){
        return this.id;
    }

    getDuration(){
        return this.duration;
    }
    protected duration;
    protected id;
}