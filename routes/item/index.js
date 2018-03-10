const express = require('express')
const router = express.Router()
const ctrl = require('./ctrl')
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, process.env.FILE_UPLOAD_DIR)
    }, 
    filename: function(req, file, cb){        
        let filename = shortid.generate()
        file.filename = filename
        cb(null, filename)
    }
})
var upload = multer({storage: storage, fileFilter: function(req, file, cb){
    var extension = path.extname(file.originalname)
    if(extension !== '.png' && extension !== '.jpg' && extension != '.jpeg'){
        return cb(null, false) 
    }    
    cb(null, true)
}, limits: {
    fileSize: 1024*1024 // 1MB
}})

router.get('/', ctrl.functions.index)
router.post('/', ctrl.functions.findOrCreate)
router.post('/img_upload', upload.single('img'), ctrl.functions.imageUpload)
router.get('/:id', ctrl.functions.show)
router.put('/:id', ctrl.functions.update)

module.exports = router;
