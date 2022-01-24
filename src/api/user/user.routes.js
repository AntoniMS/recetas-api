const UserRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth');

const { getUser, postNewUser, loginUser, logoutUser, addUserRecipe, addUserIngredient } = require('./user.controller')

UserRoutes.post('/', postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isAuth], logoutUser)
UserRoutes.get('/:id', [isAuth], getUser)
UserRoutes.patch('/recipes/:id',[isAuth], addUserRecipe)
UserRoutes.patch('/ingredients/:id',[isAuth], addUserIngredient)

module.exports = UserRoutes