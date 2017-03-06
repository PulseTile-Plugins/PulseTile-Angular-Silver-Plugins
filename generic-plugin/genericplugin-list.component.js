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

let templateGenericpluginList = require('./genericplugin-list.html');

class GenericpluginListController {
  constructor($scope, $state, $stateParams, $ngRedux, genericpluginActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    $scope.query = '';
    this.isFilter = false;
    this.isShowCreateBtn = $state.router.globals.$current.name !== 'genericplugin-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'genericplugin';


    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.genericplugin.data) {
        this.genericplugin = data.genericplugin.data;
      }
      usSpinnerService.stop("patientSummary-spinner");

      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    this.toggleFilter = function () {
      this.isFilter = !this.isFilter;
    };
    
    this.create = function () {
      $state.go('genericplugin-create', {
        patientId: $stateParams.patientId,
        filter: this.query,
        page: this.currentPage
      });
    };
    
    this.go = function (id, genericpluginSource) {
      $state.go('genericplugin-detail', {
        patientId: $stateParams.patientId,
        genericpluginIndex: id,
        filter: $scope.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: JSON.stringify(genericpluginSource)
      });
    };

    this.pageChangeHandler = function (newPage) {
      $scope.currentPage = newPage;
    };

    if ($stateParams.page) {
      $scope.currentPage = $stateParams.page;
    }

    this.search = function (row) {
      return (
        row.noteType.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.author.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.dateCreated.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
      );
    };

    if ($stateParams.filter) {
      $scope.query = $stateParams.filter;
    }


    this.selected = function (genericpluginIndex) {
      return genericpluginIndex === $stateParams.genericpluginIndex;
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.genericpluginLoad = genericpluginActions.all;
    this.genericpluginLoad($stateParams.patientId);
  }
}

const genericpluginListComponent = {
  template: templateGenericpluginList,
  controller: GenericpluginListController
};

GenericpluginListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'genericpluginActions', 'serviceRequests', 'usSpinnerService'];
export default genericpluginListComponent;