const mv = require('mv')
//const fs = require('fs')
const fs = require('fs-extra')
const path = require('path')
const Item = require('../../models/item').Item


exports.functions = {
    imageUpload: (req, res)=>{
        if(!req.file ) return res.json({ 'success': false })
        res.json({
            'success': true,
            'message': 'File successfully uploaded',
            'filename': req.file.filename
        })
    },
    index: (req, res)=>{
        Item
        .find()
        .exec(function(err, items){
            if(err) return res.status(400).json(err)
            res.json(items)
        })
    },
    findOrCreate: (req, res)=>{
        Item.find({'name': req.body.name}).exec(function(err, list){
        
            if(list.length > 0) return res.status(400).json({
                'success': false,
                'message': 'The item already exists in the database',
                'items': list
            })
            
            let item = new Item(req.body)
            item.save(function(err){
                if(err) return res.status(400).json({
                    'success': false,
                    'message': 'Error occurred while creating item',
                    'error': err
                })
                var file_path = process.env.FILE_UPLOAD_DIR + item.img_url
                fs.move(file_path, process.env.FILE_UPLOAD_DEST + item.img_url, function(err){
                    if(err) return res.json('Error in moving file')
                })
                res.json({
                    'success': true, 
                    'message': 'Item created successfully with id ' + item._id
                })
            })     
        })
    },
    show: (req, res)=>{
        Item.findById(req.params.id).exec(function(err, item){        
            if(err) return res.status(400).json({
                'success': false,
                'message': 'Error in retrieving item by id ' + req.params.id,
                'error': err
            })
            res.json(item)
        })
    },
    update: (req, res)=>{
        Item.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}, function(err, doc){
            if(!err) return res.json(doc)
        })
    }
}