const Router = require('express')
const router = new Router()
const userController = require('../controllers/user-controller');
const {body} = require('express-validator')
const autMiddleware = require('../middlewares/auth-middleware')


router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({min:5, max:32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', autMiddleware ,userController.getUser);

module.exports = router