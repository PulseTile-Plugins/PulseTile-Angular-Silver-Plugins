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
import * as helper from './clinicalstatements-helper';

let templateClinicalstatementsDetail = require('./clinicalstatements-detail.html');
let _ = require('underscore');

class ClinicalstatementsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalstatementsActions, serviceRequests, usSpinnerService) {
    
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.clinicalStatements.dataGet) {
        this.clinicalStatements = data.clinicalStatements.dataGet;
        this.statementsText = _.map(this.clinicalStatements.statements, helper.toText)
      }
      usSpinnerService.stop("clinicalNoteDetail-spinner");
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clinicalstatementsLoad = clinicalstatementsActions.get;
    this.clinicalstatementsLoad($stateParams.patientId, $stateParams.clinicalStatementIndex, $stateParams.source);
  }
}

const ClinicalstatementsDetailComponent = {
  template: templateClinicalstatementsDetail,
  controller: ClinicalstatementsDetailController
};

ClinicalstatementsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalstatementsActions', 'serviceRequests', 'usSpinnerService'];
export default ClinicalstatementsDetailComponent;