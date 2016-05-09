'use strict';

var app = angular.module('authApp');

app.service('Auth', function($http, $q) {

  this.likePost = (postId, userId) => {
    return $http.post(`/api/posts/${postId}/upvote/${userId}`)
  }

  this.disLikePost = (postId, userId) => {
    return $http.post(`/api/posts/${postId}/downvote/${userId}`)
  }


  this.makePost = (post) => {
    return $http.post('/api/posts', post)
    .then(res => {
      return res.data;
    })
  }


  this.getAllPosts = () => {
    return $http.get('/api/posts')
    .then(res => {
      return $q.resolve(res.data);
    })
  }



  this.register = userObj => {
    return $http.post('/api/users/register', userObj);
  };

  this.login = userObj => {
    return $http.post('/api/users/login', userObj)
      .then(res => {
        return this.getProfile();
      })
  };

  this.logout = () => {
    return $http.delete('/api/users/logout')
    .then(res => {
      this.currentUser = null;
      return $q.resolve();
    })
  }

  this.getProfile = () => {
    return $http.get('/api/users/profile')
    .then(res => {
      this.currentUser = res.data;
      return $q.resolve(res.data);
    })
    .catch(res => {
      this.currentUser = null;
      return $q.reject(res.data);
    })
  };
});
