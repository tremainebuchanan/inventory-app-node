const mongoose = require('mongoose')
const shortid = require('shortid')
const Schema = mongoose.Schema
var schemaOptions = {
  toJSON: {
    virtuals: true
  }
};
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_LOCAL);

exports.Item = mongoose.model('Item', mongoose.Schema({
  _id: {type: String, 'default': shortid.generate},
  name: { type: String},
  description: {type: String},
  quantity: {type: Number},
  cost_price: {type: Number},
  selling_price: {type: Number},
  img_url: {type: String},
  created_on: {type: Date, default: Date.now()}
}))
  
    
  

  