/* index.js Juneau Gawat 301076796 October 8, 2020 */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let Contacts = require('../models/contacts');
let userModel = require('../models/user');

let indexController = require('../public/controllers/index');

let user = userModel.User;

/* GET home page. */
router.get('/', indexController.DisplayHomePage);


/* GET home page. */
router.get('/home', indexController.DisplayHomePage);


/* GET Projects page. */
router.get('/projects', indexController.DisplayProductsPage);

/* GET Services page. */
router.get('/services', indexController.DisplayServicesPage);

/* GET About page. */
router.get('/about', indexController.DisplayAboutPage);

/* GET Contact page. */
router.get('/contact', indexController.DisplayContactPage);

/* Make the page go pack to home when clicking the contact button. */
router.post('/contact', indexController.ProcessContactPage);

/* GET login page. */
router.get('/login', indexController.DisplayLoginPage);

/* process login page. */
router.post('/login', indexController.ProcessLoginPage);

/* GET register page. */
router.get('/register', indexController.DisplayRegisterPage);

/* process register page. */
router.post('/register', indexController.ProcessRegisterPage);

/* preform logout page. */
router.get('/logout', indexController.PreformLogout);

module.exports = router;
