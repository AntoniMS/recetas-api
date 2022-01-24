const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { validationPassword } = require('../../utils/validation/controller');
const { setError } = require('../../utils/error/controller');

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        required: true
    },
    recipes: [{ type: Schema.Types.ObjectId, ref: 'recipes' }],
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'ingredients' }]
}, {
    collection: 'users'
})

userSchema.pre("save", function (next) {
    if (!validationPassword(this.password)) {
        return next(setError(400, 'La contraseña no tiene los minimos requeridos'))
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);