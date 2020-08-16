const express = require('express');
var router = express.Router(); 

const mongoose = require('mongoose');
const Person = mongoose.model('personModel');

router.get('/',(req,res)=>{ //(default URL, Request Handler function)
    res.render("person/addOrEdit",{ //path of view abd object
        viewT: "Insert Employee" //object's properties with assigned values
    });
});

router.post('/',(req,res)=>{
    if(req.body._id=="")  //Bcz id is hidden so id will remain empty when inputting new element
    insertRecord(req, res);
    else updateRecord(req,res)
});

function insertRecord(req,res){
    var person = new Person();
    person.fullName = req.body.fullName;
    person.email = req.body.email;
    person.mobile = req.body.mobile;
    person.city = req.body.city;
    person.save((err,doc)=>{
        if(!err)
            res.redirect('/dashboard/list');//redirect to new route, a GET request
        else {
            if(err.name =='ValidationError'){
                handleValidationError(err,req.body);
                res.render('person/addOrEdit',{ //redirecting back to same page
                    viewT: "Insert Employee",
                    person: req.body //keeping values as previous one's
                });
            }
            else
            console.log('Error while inserting: ' + err);
        }
    });
}

function updateRecord(req,res){
    //if(Mongo_id == req_id, Updated Object, if(new:false, old value will get submitted), callback)
    Person.findOneAndUpdate( {_id: req.body._id}, req.body, {new:true},(err,doc) =>{
        if(!err) {res.redirect('dashboard/list'); }
        else {
            if (err.name == "ValidationError"){
                handleValidationError(err,req.body);
                res.render("person/addOrEdit",{
                    viewT: "Update Employee",
                    person: req.body
                });
            }
            else 
            console.log("Error during Record Update: " + err);
        }
    });
}
router.get('/list', (req, res) => { //function for request handling
    Person.find((err, docs) => { //Getting values from MongoDB
        if (!err) {
            res.render("person/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default: break;
        }
    }
}
router.get('/:id',(req,res)=>{ //MongoDB record ID as request
    Person.findById(req.params.id, (err,doc) => {
        if(!err){
            res.render("person/addOrEdit",{
                viewT: "Update Employee",
                person : doc
            });
        }
    });
});

router.get('/delete/:idd',(req,res)=>{ 
    Person.findByIdAndRemove(req.params.idd, (err,doc) => {
        if(!err){
            res.redirect('/dashboard/list');
        } else  {
            console.log("Error in deletion: " + err);
        }
    });
});

//exporting router Object
module.exports = router;