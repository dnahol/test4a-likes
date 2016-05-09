'use strict';

var app = angular.module('authApp');

app.controller('profileCtrl', function($scope, Auth){
  console.log('profileCtrl!');
  console.log(Auth.currentUser._id);


  $scope.createPost = () => {

    $scope.newPost.id = Auth.currentUser
    console.log('$scope.currentUser.id:', $scope.currentUser.id);
  }


})


app.controller('homeCtrl', function($scope, Auth, posts) {
  console.log('homeCtrl!');
  console.log(posts);
  $scope.posts = posts
  $scope.toggleLiked = post => {

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
