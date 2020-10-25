/* contacts.js Juneau Gawat 301076796 October 24, 2020 */

const { Router } = require('express');
let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let passport = require('passport');

let Contacts = require('../models/contacts');

function requireAuth(req,res,next){
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

router.use(express.json());
router.use(express.urlencoded({ extended: false }))


/* GET contacts page. DisplayContactsPage*/
router.get('/', function(req, res, next) {

    Contacts.Contacts.find((err,data)=>{
      if(err){
        console.log(err);
        res.end();
      }

      res.render('index', { title: 'contacts' , contacts: data,
      displayName: req.user ? req.user.displayName : ''});
    });

  
});

/* GET ADD page */
router.get('/add', requireAuth,(req,res,next)=> {
    res.render('index', { title: 'Add Contact' ,
    displayName: req.user ? req.user.displayName : ''});
});

/* POST process the Add page */

router.post('/add', requireAuth,(req,res,next)=> {
    let contacts = Contacts.Contacts({
        "name":req.body.name,
        "number":req.body.number,
        "email":req.body.email
    });

    Contacts.Contacts.create(contacts,(err,Contacts) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        
        res.redirect('/contacts');
    });
});

/* GET Edit page */

router.get('/edit/:id', requireAuth,(req,res,next)=> {

    let id = req.params.id;

    Contacts.Contacts.findById(id,(err,ContactToEdit)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        res.render('index',
        { title: 'Edit Contact', data: ContactToEdit,
        displayName: req.user ? req.user.displayName : ''});
    });

});

/* POST process the edit page */

router.post('/edit/:id', requireAuth,(req,res,next)=> {

    let id = req.params.id;

    let updatedContacts = Contacts.Contacts({
        "_id": id,
        "name":req.body.name,
        "number":req.body.number,
        "email":req.body.email
    });
    Contacts.Contacts.updateOne({_id: id}, updatedContacts, (err)=>{
        if(err){
            console.log(err);
            res.send({err});
        }
        res.redirect('/contacts');
    });
});

/* GET process the Delete page */

router.get('/delete/:id', requireAuth,(req,res,next)=> {

    let id = req.params.id;

    Contacts.Contacts.remove({_id:id},(err)=>{
        if(err){
            console.log(err);
            res.send({err});
        }
        res.redirect('/contacts');
    });
});

module.exports = router;