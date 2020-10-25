/* user.js Juneau Gawat 301076796 October 24, 2020 */

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;

let UserSchema = Schema({
    username: String,
    email: String,
    displayName: String,
    created: {
        type:Date,
        default: Date.now()
    },
    updated:{
        type:Date,
        default: Date.now()
    }
},
{
    collection: "users"
});

UserSchema.plugin(passportLocalMongoose);

module.exports.User = Model("User",UserSchema);