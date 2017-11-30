const mongoose = require('mongoose')
const Comment = require('./comment')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title:      { type: String, required: true },
  content:    { type: String, required: true },
  createdAt:  { type: Date, default: Date.now},
  updatedAt:  { type: Date },
  subreddit:   { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  //upVotes:    [ String ], // [{ type: Schema.Types.ObjectId, ref: 'user', required: true }],
  //downVotes:  [{ type: Schema.Types.ObjectId, ref: 'user', required: true }],
  //voteTotal:  { type: Number, default: 0 }
});
//*******Later add a field for Subreddit post name

PostSchema.pre('save', (next) => {
  // SET createdAt AND updatedAt
  const date = new Date
  console.log(date.now)
  this.updatedAt = date.now
  if (!this.createdAt) {
    this.createdAt = date.now
  }
  next()
});

module.exports = mongoose.model('Post', PostSchema)
