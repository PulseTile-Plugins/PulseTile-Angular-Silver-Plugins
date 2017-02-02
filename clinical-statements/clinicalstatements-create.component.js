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

let templateClinicalstatementsCreate = require('./clinicalstatements-create.html');

class ClinicalstatementsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, personalstatementsActions, serviceRequests) {
    $scope.clinicalStatement = {};
    $scope.clinicalStatement.dateCreated = new Date().toISOString().slice(0, 10);
    
    this.setCurrentPageData = function (data) {
      if (data.personalstatements.dataCreate !== null) {
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
      $state.go('clinicalStatements', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };
    
    this.cancel = function () {
      this.goList();
    };
    
    $scope.create = function (clinicalStatementForm, clinicalStatement) {
      $scope.formSubmitted = true;

      let toAdd = {
        statementType: clinicalStatement.statementType,
        statements: clinicalStatement.statements,
        dateCreated: clinicalStatement.dateCreated,
        author: clinicalStatement.author,
        source: 'openehr'
      };

      if (clinicalStatementForm.$valid) {

        $scope.clinicalstatementsCreate(this.currentPatient.id, toAdd);
      }
    }.bind(this);

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.clinicalstatementsCreate = personalstatementsActions.create;
  }
}

const ClinicalstatementsCreateComponent = {
  template: templateClinicalstatementsCreate,
  controller: ClinicalstatementsCreateController
};

ClinicalstatementsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'personalstatementsActions', 'serviceRequests'];
export default ClinicalstatementsCreateComponent;
