const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nation: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    kcal: { type: Number, trim: true },
    img: { type: String, trim: true },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'ingredients', required: true }]
  },
  {
    timestamps: true, collection: 'recipes'
  }
);
const Recipe = mongoose.model('recipes', recipeSchema);
module.exports = Recipe;

