const RecipeRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/upload')
const {
    getAllRecipes,
    getRecipe,
    postNewRecipe,
    getRecipeByNation,
    patchRecipe,
    deleteRecipe } = require('./recipe.controller');

RecipeRoutes.get('/', getAllRecipes)
RecipeRoutes.get('/:id', getRecipe)
RecipeRoutes.get('/nation/:nation', getRecipeByNation)
RecipeRoutes.post('/', [isAuth], upload.single('img'), postNewRecipe)
RecipeRoutes.patch('/:id', [isAuth], upload.single('img'), patchRecipe)
RecipeRoutes.delete('/:id', [isAuth], upload.single('img'), deleteRecipe)

module.exports = RecipeRoutes