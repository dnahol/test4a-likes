var express = require('express');
var router = express.Router();

var Post = require('../models/post');
var User = require('../models/user');
var voting = require('mongoose-voting');
var assert = require('assert');

router.route('/')
.get((req, res) => {
  Post
  .find({})
  .populate('user')
  .exec((err, posts) => {
    res.status(err ? 400 : 200).send(err || posts);
  });
})
.post((req, res) => {
  Post.create(req.body, (err, post) => {
    res.status(err ? 400 : 200).send(err || post);
  });
});


router.route('/:postId/upvote/:userId')
.post((req, res) => {

  Post.like(req.params.postId, req.params.userId, res.handle);

});


router.route('/:postId/downvote/:userId')
.post((req, res) => {

  Post.dislike(req.params.postId, req.params.userId, res.handle);

});

// router.route('/:postId/downvote/:userId')
// .post((req, res) => {
//   Post.findById(req.params.postId, function(err, post) {
//     User.findById(req.params.userId, function (err, user) {
//       post.downvote(userId, function(err, doc) {
//         assert.equal(doc, post);  // true
//         doc.downvote(userId);      // true
//       })
//     });
//   });
// });

module.exports = router;
