var express = require('express'),
    cors = require('cors');

//var RegisteredUser = require('../models/registeredUserModel');

var routes = function(Subscription){
//var routes = function(){
    
    var subscriptionRoutes = express.Router();
    //var registeredUsers = new RegisteredUser();
   
    subscriptionRoutes.route('/')
        .post(function(req, res){
            var subscription = new Subscription(req.body);
              
              subscription.save();
              res.status(201).send(subscription);

        })
        //Get function will fetch all the database, we generally do not need this, but keeping for test
        .get(function(req,res){           
            Subscription.find(function(err,subscription){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(subscription);
            });
        });

    //TRY A MIDDLEWARE -- working and this will be use by find by id, put, patch and delete
    subscriptionRoutes.use('/:_id', function(req,res,next){
        Subscription.findById(req.params._id, function(err,subscription){
            if(err)
                res.status(500).send(err);
            else if(subscription)
            {
                req.subscription = subscription;
                next();
            }
            else
            {
                res.status(404).send('No Subscription found');
            }
        });
    });
    //Get function by _id will be used in our project to fetch individual _ids. _id is just the mobile_no
    subscriptionRoutes.route('/:_id')
        .get(function(req,res){
            res.json(req.subscription);
            
        })
        //Put verbs updates the mongoDB but careful, if you update some of the fields and do not
        //update the others, then the previous saved fields will be updated as nulls or zero strings
        //so it is danger. To avoid that even if the user only updated some of the fields like
        //only email or only home addresses then also send the full value from the Mobile Apps. This
        //way data will be saved, no danger!
        .put(function(req,res){
            Subscription.findById(req.params._id, function(err,subscription){
                if(err)
                    res.send(err);
                //These 3 fields _id, fb_id and email_id can identify the real person because
                //if user change the mobile_no and paid all fees of the year then
                //we have to update it somewhere later we will dicide. In that case
                //these 3 fields will be handy
                subscription._id = req.body._id; //CARE THIS IS MOBILE NUMBER
                subscription.fb_id = req.body.fb_id;
                subscription.email_id = req.body.email_id;
                subscription.plan = req.body.plan;
                subscription.amount_paid = req.body.amount_paid;
                subscription.discount = req.body.discount;
                subscription.txn_date = req.body.txn_date;  //auto date but here we have to provide
                subscription.txn_status = req.body.txn_status;
                subscription.txn_no = req.body.txn_no;

                //Now save it
                subscription.save(function(err, docs){
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
                req.subscription[p] = req.body[p];
            }

            req.subscription.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.subscription);
                }
            });
        })
        .delete(cors(), function(req,res){
            Subscription.remove({
                _id: req.params._id
            }, function(err){
                if(err)
                    res.send(err);
                else
                    res.json({ message: 'Successfully deleted' });
            });
        });

           
   
    return subscriptionRoutes;
};

module.exports = routes;