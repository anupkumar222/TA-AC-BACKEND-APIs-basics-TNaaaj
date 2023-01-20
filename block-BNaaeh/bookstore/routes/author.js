var express = require('express');
var router = express.Router();

var Author = require('../model/author')

// GET books sort by each author 
router.get('/sortbyauthor/:author',(req, res, next) => {
  let author = req.params.author;
  Author.findOne({"name": author}).populate('bookIds').exec((err, author)=>{
    Author.find((err, authors) =>{
      res.render('booksbyeachauthor',{books :author.bookIds,name:author.name, authors})
    })
  })
})

module.exports = router;
