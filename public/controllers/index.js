/* index.js Juneau Gawat 301076796 October 25, 2020 */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
const { User } = require('../../models/user');

module.exports.DisplayHomePage = (req,res,next) => {
    console.log("Home Page Controller");
    res.render('index', { title: 'Home' ,
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.DisplayProductsPage = (req,res,next) => {
    res.render('projects', { title: 'Projects' ,
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.DisplayServicesPage = (req,res,next) => {
    res.render('services', { title: 'Services' ,
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.DisplayAboutPage = (req,res,next) => {
    res.render('about', { title: 'About' ,
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.DisplayContactPage = (req,res,next) => {
    res.render('contact', { title: 'Contact' ,
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.ProcessContactPage = (req,res,next)=>{
    res.render('index', { title: 'Home' ,
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.DisplayLoginPage = (req,res,next) => {
    //check if logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    return res.redirect('/');
}

module.exports.ProcessLoginPage = (req,res,next) => {
    passport.authenticate('local',(err,user,info)=>{
        // server error
        if(err){
            return next(err);
        }

        // are there login errors
        if(!user){
            req.flash('loginMessage','Authentication Error');
            return res.redirect('/login');
        }

        req.login(user,(err) =>{
        // db server error
        if(err){
            return next(err);
        }

        return res.redirect('/contacts');
        })
    })(req,res,next);
}

module.exports.DisplayRegisterPage = (req,res,next) => {
    //check if logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    return res.redirect('/');
}

module.exports.ProcessRegisterPage = (req,res,next) => {
    // instantiate a new user object

    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });
    User.register(newUser,req.body.password,(err)=>{
        if(err){
            console.log('Error: Inserting New User');
            if(err.name == "UserExistsError"){
                req.flash('registerMessage','Registration Error');
                console.log('Error: User Already Exists');
            }
            return res.redirect('/register');
        }
        else{
            // no error exists


            return passport.authenticate('local')(req,res, ()=>{
                res.redirect('/contacts');
            });
        }
    })
}

module.exports.PreformLogout = (req,res,next) => {
    req.logout();
    res.redirect('/login');
}