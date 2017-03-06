/*
 ~  Copyright 2016 Ripple Foundation C.I.C. Ltd
 ~  
 ~  Licensed under the Apache License, Version 2.0 (the "License");
 ~  you may not use this file except in compliance with the License.
 ~  You may obtain a copy of the License at
 ~  
 ~    http://www.apache.org/licenses/LICENSE-2.0

 ~  Unless required by applicable law or agreed to in writing, software
 ~  distributed under the License is distributed on an "AS IS" BASIS,
 ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~  See the License for the specific language governing permissions and
 ~  limitations under the License.
 */
routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');
  console.log('routing test');
  $stateProvider

      .state('clinicalStatements', {
        url: '/patients/{patientId:int}/clinicalStatements?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<clinicalStatements-list-component></clinicalStatements-list-component>'}
        }
      })
      .state('clinicalStatements-detail', {
        url: '/patients/{patientId:int}/clinicalStatements/{clinicalStatementIndex}?filter&page&reportType&searchString&queryType&source',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<clinicalStatements-list-component></clinicalStatements-list-component>'},
          detail: {template: '<clinicalStatements-detail-component></clinicalStatements-detail-component>'}
        }
      });
}

export default routeConfig;