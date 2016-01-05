var express = require('express'),
    cors = require('cors');

var routes = function(AccidentHelp){
    
    var accidentHelpRoutes = express.Router();
    
    accidentHelpRoutes.route('/')
        .post(function(req, res){
            var accidentHelp = new AccidentHelp(req.body);
              
              accidentHelp.save();
              res.status(201).send(accidentHelp);

        })
        //Get function will fetch all the database, we generally do not need this, but keeping for test
        .get(function(req,res){           
            AccidentHelp.find(function(err,accidentHelp){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(accidentHelp);
            });
        });

    //TRY A MIDDLEWARE -- working and this will be use by find by id, put, patch and delete
    accidentHelpRoutes.use('/:_id', function(req,res,next){
        AccidentHelp.findById(req.params._id, function(err,accidentHelp){
            if(err)
                res.status(500).send(err);
            else if(accidentHelp)
            {
                req.accidentHelp = accidentHelp;
                next();
            }
            else
            {
                res.status(404).send('No Seek Help found');
            }
        });
    });
    //Get function by _id will be used in our project to fetch individual _ids. _id is just the mobile_no
    accidentHelpRoutes.route('/:_id')
        .get(function(req,res){
            res.json(req.accidentHelp);
            
        })
        //Put verbs updates the mongoDB but careful, if you update some of the fields and do not
        //update the others, then the previous saved fields will be updated as nulls or zero strings
        //so it is danger. To avoid that even if the user only updated some of the fields like
        //only email or only home addresses then also send the full value from the Mobile Apps. This
        //way data will be saved, no danger!
        .put(function(req,res){
            AccidentHelp.findById(req.params._id, function(err,accidentHelp){
                if(err)
                    res.send(err);
                //These 3 fields _id, fb_id and email_id can identify the real person because
                //if user change the mobile_no and paid all fees of the year then
                //we have to update it somewhere later we will dicide. In that case
                //these 3 fields will be handy
                accidentHelp._id = req.body._id; //CARE THIS IS MOBILE NUMBER
                accidentHelp.seekHelp_date = req.body.seekHelp_date;
                accidentHelp.lat = req.body.lat;
                accidentHelp.longt = req.body.longt;

                //Now save it
                accidentHelp.save(function(err, accidentHelp){
                    if(err)
                        res.send(err);

                    res.json(accidentHelp);
                });
            });
        })
         //For partial update
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.accidentHelp[p] = req.body[p];
            }

            req.accidentHelp.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.accidentHelp);
                }
            });
        })
        .delete(cors(),function(req,res){
            AccidentHelp.remove({
                _id: req.params._id
            }, function(err){
                if(err)
                    res.send(err);
                else
                    res.json({ message: 'Successfully deleted' });
            });
        });

           
   
    return accidentHelpRoutes;
};

module.exports = routes;