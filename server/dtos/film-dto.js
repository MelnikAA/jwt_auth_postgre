module.exports = class FilmDto{
    name;
    id;
    kp_id;
    year;

    constructor(model){
        this.name = model.name
        this.id = model.id;
        this.kp_id = model.kp_id;
        this.year = model.year;
    }
    
}