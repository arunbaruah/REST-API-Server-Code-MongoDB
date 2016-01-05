var express = require('express'),
    cors = require('cors');

//var RegisteredUser = require('../models/registeredUserModel');

var routes = function(RegisteredUser){
//var routes = function(){
    
    var registeredUserRoutes = express.Router();
    //var registeredUsers = new RegisteredUser();
   
    registeredUserRoutes.route('/')
        .post(function(req, res){
            var registeredUser = new RegisteredUser(req.body);
              
              registeredUser.save();
              res.status(201).send(registeredUser);

        })
        //Get function will fetch all the database, we generally do not need this, but keeping for test
        .get(function(req,res){           
            RegisteredUser.find(function(err,registeredUser){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(registeredUser);
            });
        });

    //TRY A MIDDLEWARE -- working and this will be use by find by id, put, patch and delete
    registeredUserRoutes.use('/:_id', function(req,res,next){
        RegisteredUser.findById(req.params._id, function(err,registeredUser){
            if(err)
                res.status(500).send(err);
            else if(registeredUser)
            {
                req.registeredUser = registeredUser;
                next();
            }
            else
            {
                res.status(404).send('No Registered User found');
            }
        });
    });
    //Get function by _id will be used in our project to fetch individual _ids. _id is just the mobile_no
    registeredUserRoutes.route('/:_id')
        .get(function(req,res){
            res.json(req.registeredUser);
            
        })
        //Put verbs updates the mongoDB but careful, if you update some of the fields and do not
        //update the others, then the previous saved fields will be updated as nulls or zero strings
        //so it is danger. To avoid that even if the user only updated some of the fields like
        //only email or only home addresses then also send the full value from the Mobile Apps. This
        //way data will be saved, no danger!
        .put(function(req,res){
            RegisteredUser.findById(req.params._id, function(err,registeredUser){
                if(err)
                    res.send(err);

                registeredUser._id = req.body._id; //CARE THIS IS MOBILE NUMBER
                registeredUser.fb_id = req.body.fb_id;
                registeredUser.home_ph_no = req.body.home_ph_no;
                registeredUser.email_id = req.body.email_id;
                registeredUser.pwd = req.body.pwd;
                registeredUser.fname = req.body.fname;
                registeredUser.mname = req.body.mname;
                registeredUser.lname = req.body.lname;
                registeredUser.home_add_residence_name = req.body.home_add_residence_name;
                registeredUser.home_add_1 = req.body.home_add_1;
                registeredUser.home_add_2 = req.body.home_add_2;
                registeredUser.pin = req.body.pin;
                registeredUser.current_office_name = req.body.current_office_name;
                registeredUser.city = req.body.city;
                registeredUser.state = req.body.state;
                registeredUser.country = req.body.country;
                registeredUser.registered_Date = req.body.registered_Date;
                //registeredUser.country = 
                //registered_Date cannot be changed

                //Now save it
                registeredUser.save(function(err, docs){
                    if(err)
                        res.send(err);

                    res.json(docs);
                });
            });
        })
         //For partial update
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.registeredUser[p] = req.body[p];
            }

            req.registeredUser.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.registeredUser);
                }
            });
        })
        .delete(cors(), function(req,res){
            RegisteredUser.remove({
                _id: req.params._id
            }, function(err){
                if(err)
                    res.send(err);
                else
                    res.json({ message: 'Successfully deleted' });
            });
        });

           
   
    return registeredUserRoutes;
};

module.exports = routes;