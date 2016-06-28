// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,DB) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // initialize DB
     DB.init();
  });
})
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
            name: 'documents_new',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'TaskName', type: 'text'},
                {name: 'taskDetails', type: 'text'},
                {name: 'isCompleted', type: 'numeric'}
            ]
        }
    ]
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:



  .state('tab.taskadd', {
    url: '/taskadd',
    cache: false,
    views: {
      'tab-taskadd': {
        templateUrl: 'templates/taskadd.html',
        controller: 'TaskAddCtrl'
      }
    }
  })

  .state('tab.task', {
    url: '/task',
    cache: false,
    views: {
      'tab-task': {
        templateUrl: 'templates/task.html',
        controller: 'TaskCtrl'
      }
    }
  })

  .state('tab.taskcompleted', {
      url: '/taskcompleted',
      cache: false,
      views: {
        'tab-taskcompleted': {
          templateUrl: 'templates/task-completed.html',
          controller: 'TaskCompletedCtrl'
        }
      }
    })
    .state('tab.task-detail', {
      url: '/task-detail/:taskID',
      cache: false,
      views: {
        'tab-taskcompleted': {
          templateUrl: 'templates/task-detail.html',
          controller: 'TaskDetailCtrl'
        }
      }
    });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/taskadd');

});
