const express = require('express');
const router = express.Router();
const models = require('../models/item')
const User = models.User
const Item = models.Item

router.get('/', (req, res) => {
  Item.find().exec(function(err, items){
      if(!err) return res.json(items)
  })
})

router.post('/', (req, res)=>{
    let item = new Item(req.body)
    item.save(function(err){
        if(err) return res.status(400).json('Error in creating item')
        res.json(item._id)
    })    
})

router.get('/:id', (req,res)=>{
    Item.findById(req.params.id).exec(function(err, item){        
        if(err) return res.status(400).json('No record found')
        res.json(item)
    })
})

router.put('/:id', (req, res)=>{
    Item.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function(err, doc){
        if(!err) return res.json(doc)
    })
})

module.exports = router;
