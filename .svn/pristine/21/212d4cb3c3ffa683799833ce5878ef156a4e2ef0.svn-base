var express = require('express'),
    cors = require('cors');

var routes = function(PoliceHelp){
    
    var policeHelpRoutes = express.Router();
    
    policeHelpRoutes.route('/')
        .post(function(req, res){
            var policeHelp = new PoliceHelp(req.body);
              
              policeHelp.save();
              res.status(201).send(policeHelp);

        })
        //Get function will fetch all the database, we generally do not need this, but keeping for test
        .get(function(req,res){           
            PoliceHelp.find(function(err,policeHelp){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(policeHelp);
            });
        });

    //TRY A MIDDLEWARE -- working and this will be use by find by id, put, patch and delete
    policeHelpRoutes.use('/:_id', function(req,res,next){
        PoliceHelp.findById(req.params._id, function(err,policeHelp){
            if(err)
                res.status(500).send(err);
            else if(policeHelp)
            {
                req.policeHelp = policeHelp;
                next();
            }
            else
            {
                res.status(404).send('No Seek Help found');
            }
        });
    });
    //Get function by _id will be used in our project to fetch individual _ids. _id is just the mobile_no
    policeHelpRoutes.route('/:_id')
        .get(function(req,res){
            res.json(req.policeHelp);
            
        })
        //Put verbs updates the mongoDB but careful, if you update some of the fields and do not
        //update the others, then the previous saved fields will be updated as nulls or zero strings
        //so it is danger. To avoid that even if the user only updated some of the fields like
        //only email or only home addresses then also send the full value from the Mobile Apps. This
        //way data will be saved, no danger!
        .put(function(req,res){
            PoliceHelp.findById(req.params._id, function(err,policeHelp){
                if(err)
                    res.send(err);
                //These 3 fields _id, fb_id and email_id can identify the real person because
                //if user change the mobile_no and paid all fees of the year then
                //we have to update it somewhere later we will dicide. In that case
                //these 3 fields will be handy
                policeHelp._id = req.body._id; //CARE THIS IS MOBILE NUMBER
                policeHelp.seekHelp_date = req.body.seekHelp_date;
                policeHelp.lat = req.body.lat;
                policeHelp.longt = req.body.longt;

                //Now save it
                policeHelp.save(function(err, policeHelp){
                    if(err)
                        res.send(err);

                    res.json(policeHelp);
                });
            });
        })
         //For partial update
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.policeHelp[p] = req.body[p];
            }

            req.policeHelp.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.policeHelp);
                }
            });
        })
        .delete(cors(),function(req,res){
            PoliceHelp.remove({
                _id: req.params._id
            }, function(err){
                if(err)
                    res.send(err);
                else
                    res.json({ message: 'Successfully deleted' });
            });
        });

           
   
    return policeHelpRoutes;
};

module.exports = routes;