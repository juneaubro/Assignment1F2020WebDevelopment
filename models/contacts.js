/* contacts.js Juneau Gawat 301076796 October 24, 2020 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;

let Contacts = new Schema({
    name: String,
    number: String,
    email: String
},
{
    collection: "businessC"
});

module.exports.Contacts = Model("Contacts",Contacts);