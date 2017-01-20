routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');
  console.log('routing test');
  $stateProvider
      .state('heightAndWeights', {
        url: '/patients/{patientId:int}/heightAndWeights?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<height-and-weight-list-component></height-and-weight-list-component>'}
        }
      })
      .state('heightAndWeights-detail', {
        url: '/patients/{patientId:int}/heightAndWeights/{heightAndWeightIndex}?filter&page&reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<height-and-weight-list-component></height-and-weight-list-component>'},
          detail: {template: '<height-and-weight-detail-component></height-and-weight-detail-component>'}
        }
      });
}

export default routeConfig;