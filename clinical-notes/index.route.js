routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');
  console.log('routing test');
  $stateProvider

      .state('clinicalNotes', {
        url: '/patients/{patientId:int}/clinicalNotes?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<clinicalnotes-list-component></clinicalnotes-list-component>'}
        }
      })
      .state('clinicalNotes-detail', {
        url: '/patients/{patientId:int}/clinicalNotes/{clinicalNoteIndex}?filter&page&reportType&searchString&queryType&source',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<clinicalnotes-list-component></clinicalnotes-list-component>'},
          detail: {template: '<clinicalnotes-detail-component></clinicalnotes-detail-component>'}
        }
      });
}

export default routeConfig;