const Router = require('express').Router;
const router= new Router()
const filmRouter = require('./filmRouter')
const seriesRouter = require('./filmRouter')
const userRouter = require('./userRouter')
const seriesListRouter = require('./seriesListRouter')
const filmListRouter = require('./filmListRouter')

router.use('/user', userRouter)
router.use('/filmlist', filmListRouter)
router.use('/serieslist', seriesListRouter)
router.use('/film', filmRouter)
router.use('/series', seriesRouter)


module.exports = router
