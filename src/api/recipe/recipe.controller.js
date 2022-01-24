const Recipe = require('./recipe.model')
const { setError } = require('../../utils/error/controller');
const { deleteImgCloudinary } = require('../../middlewares/delete');
const getAllRecipes = async (req, res, next) => {
    try {
        const allRecipes = await Recipe.find().populate('ingredients');
        res.status(200).json(allRecipes)
    } catch (error) {
        return next(error)
    }
}
const getRecipe = async (req, res, next) => {
    try {
        const { id } = req.params
        const recipe = await Recipe.findById(id).populate('ingredients');
        if (!recipe) {
            return next(setError(404, 'Recipe not found'))
        }
        return res.status(200).json(recipe)
    } catch (error) {
        return next(error)
    }
}
const postNewRecipe = async (req, res, next) => {
    try {
        const newRecipe = new Recipe(req.body)
        if (req.file) {
            newRecipe.img = req.file.path
        }
        const recipeInBd = await newRecipe.save()
        return res.status(201).json(recipeInBd)
    } catch (error) {
        return next(error)
    }
}

const patchRecipe = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchRecipe = new Recipe(req.body)
        patchRecipe._id = id
        if (req.file) {
            patchRecipe.img = req.file.path
        }
        const recipeDB = await Recipe.findByIdAndUpdate(id, patchRecipe)
        if (!recipeDB) {
            return next(setError(404, 'Recipe not found'))
        }
        if (recipeDB.img) deleteFile(recipeDB.img)
        return res.status(200).json({ new: patchRecipe, old: recipeDB })
    } catch (error) {
        return next(setError(500, 'Recipe Patch server error'))
    }
}

const getRecipeByNation = async (req, res, next) => {
    const { nation } = req.params
    try {
        console.log(nation);
        const recipeDB = await Recipe.find({
            nation
        })
        if (!recipeDB) {
            return next(setError(404, ` ${nation} not found`))
        }
        return res.status(200).json(recipeDB)
    } catch (error) {
        return next(setError(500, 'Recipes server error'))
    }
}



const deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedRecipe = await Recipe.findByIdAndDelete(id)
        if (!deletedRecipe) return next(setError(404, 'Recipe not found'))
        if (deletedRecipe.img) deleteImgCloudinary(deletedRecipe.img)
        return res.status(200).json(deletedRecipe)
    } catch (error) {
        return next(error)
    }
}
module.exports = {
    getAllRecipes,
    getRecipe,
    getRecipeByNation,
    patchRecipe,
    postNewRecipe,
    deleteRecipe
}