'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var voting = require('mongoose-voting');
var assert = require('assert');

var User = require('./user');

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET');
}

var postSchema = new mongoose.Schema({
  post: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
},
{
  timestamps: true
});

postSchema.plugin(voting);

postSchema.statics.like = function(postId, userId, cb) {
  console.log('postId: ', postId);
  console.log('userId: ', userId);
  Post.findById(postId, (err1, post) => {
    User.findById(userId, (err2, user) => {
       if(err1 || err2) return cb(err1 || err2);

       console.log('post: ', post);

      post.upvote(user, function(err, doc) {
        assert.equal(doc, post);  // true
        doc.upvote(user);      // true
        cb(err);
      })
    });
  });
};

// postSchema.statics.like = function(userId, postId, cb) {
//
//   User.findById(user1Id, (err1, user1) => {
//     User.findById(user2Id, (err2, user2) => {
//       if(err1 || err2) return cb(err1 || err2);
//
//       var user1HasFriend = user1.friends.indexOf(user2._id) !== -1;
//       var user2HasFriend = user2.friends.indexOf(user1._id) !== -1;
//
//       if(user1HasFriend || user2HasFriend) {
//         return cb({error: "They're already friends!"});
//       }
//
//       user1.friends.push(user2._id);
//       user2.friends.push(user1._id);
//
//       user1.save((err1) => {
//         user2.save((err2) => {
//           cb(err1 || err2);
//         });
//       });
//     });
//   });
// };




var Post = mongoose.model('Post', postSchema);



module.exports = Post;
