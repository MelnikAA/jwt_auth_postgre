const ApiError = require('../error/ApiError')
const {Film} = require('../models/models');
const filmService = require('../service/film-service');
const userService = require('../service/user-service');
const uuid = require('uuid')
const path = require('path')

class FilmController{
    async create(req, res, next) {
        try {
            const {name, kp_id, year} = req.body;
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const filmData = await Film.create({name, kp_id, year, img:fileName})
            return res.json(filmData);
        }
        catch(e) {
            next(e)
        }
    }
    async getOneFilms(req, res, next) {
        try{
            const {id} = req.params
            const film = await Film.findOne({where:{id}})
            return res.json(film);
        }
        
        catch(e){
            next(e)
        }
    }
    async getAllFilms(req, res, next) {
        try{
            const films = await Film.findAll();
           return res.json(films);
        } catch(e){
            next(e);
        }
    }
    async update(req, res, next) {

    }
    async deleteOne(req, res, next) {
        const {id} = req.params
        const film = await Film.destroy({where:{id}});
        return res.json('удалено успешно');
    }
    async changeStatus(req, res) {

    }
    async addNote(req, res) {

    }
}

module.exports = new FilmController()