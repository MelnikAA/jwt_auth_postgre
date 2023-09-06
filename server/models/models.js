const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue:false},
    activationLink: {type: DataTypes.STRING},
})

const Token = sequelize.define('token', {
    refreshToken: {type: DataTypes.STRING, allowNull: false},
})

const Film_list = sequelize.define('film_list', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
})

const Series_list = sequelize.define('series_list', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
})

const Film_connect = sequelize.define('film_list', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
})

const Series_connect = sequelize.define('film_list', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
})

const Series = sequelize.define('series', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    year: {type: DataTypes.INTEGER},
    kp_id: {type: DataTypes.STRING, unique:true},
    viewdate: {type: DataTypes.DATE},
    viewstatus: {type: DataTypes.BOOLEAN}
})

const Film = sequelize.define('film', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    year: {type: DataTypes.INTEGER},
    kp_id: {type: DataTypes.STRING, unique:true},
    viewdate: {type: DataTypes.DATE},
    viewstatus: {type: DataTypes.BOOLEAN},
    img:{type: DataTypes.STRING}
})

const Film_note = sequelize.define('film_note', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    note:{type: DataTypes.STRING}
})


User.hasOne(Token)
Token.belongsTo(User)

User.hasMany(Film)
Film.belongsTo(User)

User.hasOne(Film_list)
Film_list.belongsTo(User)

User.hasOne(Series_list)
Series_list.belongsTo(User)

Film_list.hasMany(Film_connect)
Film_connect.belongsTo(Film_list)

Series_list.hasMany(Series_connect)
Series_connect.hasMany(Series_list)

User.hasMany(Film_note)
Film_note.belongsTo(User)

Film.hasMany(Film_note)
Film_note.belongsTo(Film)

module.exports = {
    User, Token, 
    Film, Series, Film_note,
    Film_list, Series_list, 
    Film_connect, Series_connect
}