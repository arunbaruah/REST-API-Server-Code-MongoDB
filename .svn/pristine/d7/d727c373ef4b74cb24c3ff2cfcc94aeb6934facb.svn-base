var express = require('express'),
    cors = require('cors');

var routes = function(RegisteredStaff){
//var routes = function(){
    
    var registeredStaffsRoutes = express.Router();
   
    registeredStaffsRoutes.route('/')
        .post(function(req, res){
            var registeredStaff = new RegisteredStaff(req.body);
              
              registeredStaff.save();
              res.status(201).send(registeredStaff);

        })
        //Get function will fetch all the database, we generally do not need this, but keeping for test
        .get(function(req,res){           
            RegisteredStaff.find(function(err,registeredStaff){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(registeredStaff);
            });
        });

    //TRY A MIDDLEWARE -- working and this will be use by find by id, put, patch and delete
    registeredStaffsRoutes.use('/:_id', function(req,res,next){
        RegisteredStaff.findById(req.params._id, function(err,registeredStaff){
            if(err)
                res.status(500).send(err);
            else if(registeredStaff)
            {
                req.registeredStaff = registeredStaff;
                next();
            }
            else
            {
                res.status(404).send('No Registered User found');
            }
        });
    });
    //Get function by _id will be used in our project to fetch individual _ids. _id is just the mobile_no
    registeredStaffsRoutes.route('/:_id')
        .get(function(req,res){
            res.json(req.registeredStaff);
            
        })
        //Put verbs updates the mongoDB but careful, if you update some of the fields and do not
        //update the others, then the previous saved fields will be updated as nulls or zero strings
        //so it is danger. To avoid that even if the user only updated some of the fields like
        //only email or only home addresses then also send the full value from the Mobile Apps. This
        //way data will be saved, no danger!
        .put(function(req,res){
            RegisteredStaff.findById(req.params._id, function(err,registeredStaff){
                if(err)
                    res.send(err);

                registeredStaff._id = req.body._id; //CARE THIS IS MOBILE NUMBER
                registeredStaff.fb_id = req.body.fb_id;
                registeredStaff.office_id = req.body.office_id;
                registeredStaff.email_id = req.body.email_id;
                registeredStaff.pwd = req.body.pwd;
                registeredStaff.fname = req.body.fname;
                registeredStaff.mname = req.body.mname;
                registeredStaff.lname = req.body.lname;
                registeredStaff.designation = req.body.designation;
                registeredStaff.managers_name = req.body.managers_name;
                registeredStaff.office_ph_no = req.body.office_ph_no;
                registeredStaff.pin = req.body.pin;
                registeredStaff.current_office_name = req.body.current_office_name;
                registeredStaff.current_office_location = req.body.current_office_location;
                registeredStaff.city = req.body.city;
                registeredStaff.state = req.body.state;
                registeredStaff.country = req.body.country;
                registeredStaff.registered_Date = req.body.registered_Date;
                
                //Now save it
                registeredStaff.save(function(err, docs){
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
                req.registeredStaff[p] = req.body[p];
            }

            req.registeredStaff.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.registeredStaff);
                }
            });
        })
        .delete(cors(),function(req,res){
            RegisteredStaff.remove({
                _id: req.params._id
            }, function(err){
                if(err)
                    res.send(err);
                else
                    res.json({ message: 'Successfully deleted' });
            });
        });

           
   
    return registeredStaffsRoutes;
};

module.exports = routes;