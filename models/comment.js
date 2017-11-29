const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
   content: { type: String, required: true },
   createdAt: {type: Date},
   updatedAt: {type: Date},
   author : { type: Schema.Types.ObjectId, ref: 'User', required: true },
   comments: [this],
   postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
 });

CommentSchema.pre('save', function(next){
  const date = new Date
  this.updatedAt = date
  if(!this.createdAt){
    this.createdAt = date
  }
  next();
})

module.exports = mongoose.model('Comment', CommentSchema)
