const Router = require('express')
const filmController = require('../controllers/film-controller')
const filmService = require('../service/film-service')
const router = new Router()

router.post('/', filmController.create)
router.get('/', filmController.getAllFilms)
router.get('/:id', filmController.getOneFilms)
router.delete('/:id', filmController.deleteOne)

module.exports = router