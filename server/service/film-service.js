const {Film, Film_note} = require('../models/models')
const FilmDto = require('../dtos/film-dto');

class FilmService{
    async create(name, kp_id, year) {
        try {
            const {name, kp_id, year} = req.body;
            const film = await Film.create({name, kp_id, year})
        }
        catch {

        }
    }
   // async addNote(id) {
    //    const film = await Film.findOne({where:{userId, id}});
    //    const note = 
   //     return film;
   // }
    async updateNote(id, note) {

    }
    async getAllFilms(userId) {
        const films = await Film.findAll({where:{userId}});
        return films;
    }
    async getOneFilms() {
        const films = await Film.findOne({where:{id}});
        return films;
    }
    



}
module.exports = new FilmService();