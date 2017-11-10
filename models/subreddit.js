//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var productSchema = new Schema({
        title: {type:String, max: 1000},
        author: String,
        image_url: String,
        created_at: [{ body: Date, date:Date}],
        about: String
});

productSchema.pre('save', (next)=>{
  const now = new Date()
  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }
  next()
})

var productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
