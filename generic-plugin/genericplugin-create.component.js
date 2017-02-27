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

let templateGenericpluginCreate = require('./genericplugin-create.html');

class GenericpluginCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, genericpluginActions, serviceRequests) {
    $scope.clinicalNote = {};
    $scope.clinicalNote.dateCreated = new Date().toISOString().slice(0, 10);
    
    this.setCurrentPageData = function (data) {
      if (data.genericplugin.dataCreate !== null) {
        this.goList();
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
      }
    };

    this.goList = function () {
      $state.go('genericplugin', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };
    
    this.cancel = function () {
      this.goList();
    };
    
    $scope.create = function (clinicalNoteForm, clinicalNote) {
      $scope.formSubmitted = true;

      let toAdd = {
        noteType: clinicalNote.noteType,
        notes: clinicalNote.notes,
        dateCreated: clinicalNote.dateCreated,
        author: clinicalNote.author,
        source: 'openehr'
      };

      if (clinicalNoteForm.$valid) {

        $scope.genericpluginCreate(this.currentPatient.id, toAdd);
      }
    }.bind(this);

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.genericpluginCreate = genericpluginActions.create;
  }
}

const genericpluginCreateComponent = {
  template: templateGenericpluginCreate,
  controller: GenericpluginCreateController
};

GenericpluginCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'genericpluginActions', 'serviceRequests'];
export default genericpluginCreateComponent;
