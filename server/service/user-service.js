const {User, Token} = require('../models/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error')
require('dotenv').config()

class UserService {
    async registration(email, password){
        const cantdidate = await User.findOne({where: {email}})
        if (cantdidate){
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await User.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `http://localhost:5000/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return{
            ...tokens,
            user: userDto
        }
    }
    async activate(activationLink){
        const user = await User.findOne({where:{activationLink}});
        console.log(activationLink);
        console.log(user);
        if(!user) {
            throw new ApiError.BadRequest ('Некорректная ссылка')
        }
        user.isActivated = true;
        await user.save();
        console.log(user.isActivated);
    }
    async login(email, password) {
        const user = await User.findOne({where:{email}})
        if(!user){
            throw ApiError.BadRequest('пользователь с таким email не был найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);

        if(!isPassEquals){
            throw ApiError.BadRequest('Некорректный пароль')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return{
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError();

        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData || ! tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findByPk(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return{
            ...tokens,
            user: userDto
        }

    }

    async getAllUsers(){
        const users = await User.findAll();
        return users;
    }
}

module.exports = new UserService();