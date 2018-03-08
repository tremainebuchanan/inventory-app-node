const mongoose = require('mongoose')
const shortid = require('shortid'),
    Schema = mongoose.Schema

var schemaOptions = {
  toJSON: {
    virtuals: true
  }
};
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_LOCAL);

var UserSchema = mongoose.Schema({
  _id: {type: String, 'default': shortid.generate},
  name: {type: String},
  email: {type: String},
  password: {type: String, select: false}
})

var ItemSchema = mongoose.Schema({
    _id: {type: String, 'default': shortid.generate},
    name: { type: String},
    description: {type: String},
    quantity: {type: Number},
    cost_price: {type: Number},
    selling_price: {type: Number},
    created_on: {type: Date, default: Date.now()},
    created_by: {type: Schema.Types.ObjectId, ref: 'User'}
})
    
exports.User = mongoose.model('User', UserSchema)
exports.Item = mongoose.model('Item', ItemSchema)
  
    
  

  