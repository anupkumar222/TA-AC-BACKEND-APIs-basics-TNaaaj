var express = require('express');
var router = express.Router();
var Country = require('../models/Country');
var State = require('../models/State');
var S = require('string');
var mongoose = require('mongoose');

/* POST state */
router.post('/new', async function(req, res, next) {
  try{
    req.body.country = S(req.body.country).capitalize().s;
    let country =  await Country.findOne({name:req.body.country});
    if(!country) throw 'Country not found!';
    let neighbouring_states = req.body.neighbouring_states.split(',');
    req.body.neighbouring_states = [];
    delete req.body.country;
    var createdState = await State.create(req.body);
    
    await Country.findByIdAndUpdate(country.id, {$push: {states:createdState.id}});
    for(let eachState of neighbouring_states){
       eachState = S(eachState).capitalize().s;
       let state = await State.findOne({name:eachState.trim()});
       if(state){
         req.body.neighbouring_states.push(state.id);
         await State.findByIdAndUpdate(state.id, {$push: {neighbouring_states: createdState.id}});
       }
    }
    req.body.country = country.id;
    var state = await State.findByIdAndUpdate(createdState.id, req.body, {new: true});
    res.status(200).json(state);

  }catch(error){
      next(error);
  }
});


// GET states in asc/desc
router.get('/:id/sortby', async(req, res, next) => {
  const type = req.query.type;
  let id = req.params.id;
  if(type === "asc"){
    let states = await State.aggregate([
      {$match:{"country": mongoose.Types.ObjectId(id)}},
      {$sort:{name:1}}
    ])
    return res.send(states);
  }else if(type === "desc"){
    let states = await State.aggregate([
      {$match:{"country": mongoose.Types.ObjectId(id)}},
      {$sort:{name:-1}}
    ])
    return res.send(states);
  }
})

// GET ascending order of their population
router.get('/:id/sortbyasc', async(req, res, next) => {
  const type = req.query.type;
  let id = req.params.id;
  let states = await State.aggregate([
    {$match:{"country": mongoose.Types.ObjectId(id)}},
    {$sort:{population:1}}
  ])
  return res.send(states);
})

// GET all neighbouring states

router.get('/:id/neighbouringstates', async(req, res, next) => {
  let id = req.params.id;
  let states = await State.findById(id).populate('neighbouring_states');
  return res.send(states.neighbouring_states);
})

module.exports = router;