const IngredientRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/upload')

const {
    getAllIngredients,
    getIngredient,
    postNewIngredient,
    getIngredientByName,
    getIngredientByFood,
    deleteIngredient } = require('./ingredient.controller');


IngredientRoutes.get('/', getAllIngredients)
IngredientRoutes.get('/:id', getIngredient)
IngredientRoutes.get('/name/:name', getIngredientByName)
IngredientRoutes.get('/food/:food', getIngredientByFood)
IngredientRoutes.post('/', [isAuth], upload.single('img'), postNewIngredient)
IngredientRoutes.delete('/:id',[isAuth], deleteIngredient)

module.exports = IngredientRoutes;