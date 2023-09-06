require('dotenv').config()
const express  = require('express');
const sequelize = require('./db')
const cors = require('cors');
const coockieParser = require('cookie-parser');
const models = require('./models/models')
const fileUpload = require('express-fileupload')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')
const errorHandler = require ('./middlewares/ErrorHandingMiddleware')
const path = require('path')
const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use(coockieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);
app.use(errorHandler);

const start = async () =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server is done on port=${PORT} (✿◡‿◡)`))
    } catch (e){
        console.log(e)
    }
}

start()