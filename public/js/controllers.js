'use strict';

var app = angular.module('authApp');

app.controller('profileCtrl', function($scope, Auth, $state) {
  console.log('profileCtrl!');
  console.log(Auth.currentUser);
  console.log('$scope.currentUser:', $scope.currentUser);


  $scope.createPost = (post) => {

    

    console.log('$scope.currentUser:', $scope.currentUser);
  }


})


app.controller('homeCtrl', function($scope, Auth, posts) {
  console.log('homeCtrl!');
  console.log(posts);
  $scope.posts = posts

  $scope.isLiked = post => {
    return post.vote.positive.indexOf($scope.currentUser._id)
  }


  $scope.toggleLiked = (post) => {
    console.log(post);
    console.log($scope.isLiked(post));

    if( $scope.isLiked(post) < 0 ) {
      Auth.likePost(post._id, $scope.currentUser._id);
      location.reload();
    } else {
      Auth.disLikePost(post._id, $scope.currentUser._id);
      location.reload();
    }

  }
})

app.controller('mainCtrl', function($scope, Auth, $state) {

  $scope.$watch(function() {
    return Auth.currentUser;
  }, function(newVal, oldVal) {
    console.log('oldVal: ', oldVal);
    console.log('newVal: ', newVal );
    $scope.currentUser = newVal;
  })


  // console.log('mainCtrl');
  // Auth.getProfile()
  //   .then(res => {
  //     $scope.currentUser = res.data;
  //   })
  //   .catch(res => {
  //     $scope.currentUser = null;
  //   })
  $scope.logout = () => {
    Auth.logout()
    .then(res => {
      $state.go('home');
    })
  }

});


app.controller('authFormCtrl', function($scope, $state, Auth) {
  console.log('authFormCtrl!');

  $scope.currentState = $state.current.name;

  $scope.submitForm = () => {
    if($scope.currentState === 'register') {

      // register user
      if($scope.user.password !== $scope.user.password2) {

        $scope.user.password = '';
        $scope.user.password2 = '';

        alert('Passwords must match.')
      } else {
        Auth.register($scope.user)
        .then(res => {
          return Auth.login($scope.user);
        })
        .then(res => {
          $state.go('home');
        })
        .catch(res => {
          alert(res.data.error);
        });
      }
    } else {
      // login user

      Auth.login($scope.user)
      .then(res => {
        $state.go('home');
      })
      .catch(res => {
        alert(res.data.error);
      })

    }
  };

});
