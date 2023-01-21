var express = require('express');
var router = express.Router();
var Country = require('../models/Country');
var S = require('string');

//post country
router.post('/new', async(req, res, next) => {
  try{
      let neighbouring_countires = req.body.neighbouring_countires.split(',');
      req.body.name = S(req.body.name).capitalize().s;
      req.body.ethenticity.split(',').map(ele => ele.trim());
      req.body.neighbouring_countires = [];
      var createdCountry = await Country.create(req.body);
      for(let eachCountry of neighbouring_countires) {
        eachCountry = S(eachCountry).capitalize().s;
        let country = await Country.findOne({ name: eachCountry.trim() });
        if(country) {
          req.body.neighbouring_countires.push(country.id);
          await Country.findByIdAndUpdate(country.id, {$push: {neighbouring_countires: createdCountry.id}})
        }
      }
      var country = await Country.findByIdAndUpdate(createdCountry.id, req.body, {new: true});
      res.status(404).json(country);
  } catch(err) {
    next(err);
  }
})

//GET country in asc/dsc order
router.get('/sortby', async(req, res, next) => {
  try {
  const type = req.query.type;
  if(type === 'asc') {
    let countries = await Country.aggregate([
      {$sort: {name : 1}}
    ])
    res.send(countries);
  } else {
    if(type === 'dsc') {
      let countries = await Country.aggregate([
        {$sort: {name:-1}}
      ])
      res.send(countries);
    }
  }
} catch(err) {
  next(err);
}
})

module.exports = router;
