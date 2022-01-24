const Ingredient = require('./ingredient.model')
const { setError } = require('../../utils/error/controller');
const { deleteImgCloudinary } = require('../../middlewares/delete');


const getAllIngredients = async (req, res, next) => {
    try {
        const allIngredients = await Ingredient.find()
        res.status(200).json(allIngredients)
    } catch (error) {
        return next(error)
    }
}

const getIngredient = async (req, res, next) => {
    try {
        const { id } = req.params
        const ingredient = await Ingredient.findById(id)
        if (!ingredient) {
            return next(setError(404, 'Ingredient not found'))
        }
        return res.status(200).json(ingredient)

    } catch (error) {
        return next(error)
    }
}

const postNewIngredient = async (req, res, next) => {
    try {
        const newIngredient = new Ingredient(req.body)
        if (req.file) {
            newIngredient.img = req.file.path
        }
        const ingredientInBd = await newIngredient.save()
        return res.status(201).json(ingredientInBd)
    } catch (error) {
        return next(error)
    }
}
const getIngredientByName = async (req, res, next) => {
    const { name } = req.params
    try {
        console.log(name);
        const ingredientDB = await Ingredient.find({
            name
        })//.populate('ingredients') 
        if (!ingredientDB) {
            return next(setError(404, ` ${name} not found`))
        }
        return res.status(200).json(ingredientDB)
    } catch (error) {
        return next(setError(500, 'Ingredients server error'))
    }
}

const getIngredientByFood = async (req, res, next) => {
    const { food } = req.params
    try {
        console.log(food);
        const ingredientDB = await Ingredient.find({
            food
        })//.populate('ingredients') 
        if (!ingredientDB) {
            return next(setError(404, ` ${food} not found`))
        }
        return res.status(200).json(ingredientDB)
    } catch (error) {
        return next(setError(500, 'Ingredients server error'))
    }
}






const deleteIngredient = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedIngredient = await Ingredient.findByIdAndDelete(id)
        if (!deletedIngredient) {
            return next(setError(404, 'Ingredient not found'))
        }
        if (deletedIngredient.img) deleteImgCloudinary(deletedIngredient.img)
        return res.status(200).json(deletedIngredient)

    } catch (error) {
        return next(error)
    }
}


module.exports = {
    getAllIngredients,
    getIngredient,
    getIngredientByName,
    getIngredientByFood,
    postNewIngredient,
    deleteIngredient
}