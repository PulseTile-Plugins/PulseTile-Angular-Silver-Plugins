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
  
    //Edit Clinical Note
    
    $scope.isEdit = false;
    
    this.edit = function () {
      $scope.isEdit = true;

      $scope.currentUser = this.currentUser;
      $scope.clinicalStatementsEdit = Object.assign({}, this.clinicalStatements);
      $scope.patient = this.currentPatient;
    };

    this.cancelEdit = function () {
      $scope.isEdit = false;
    };

    $scope.confirmEdit = function (personalNoteForm, personalNote) {
      $scope.formSubmitted = true;

      if (personalNoteForm.$valid) {
        let toUpdate = {
          statements: apiStatements,
          dateCreated: clinicalStatement.dateCreated,
          author: clinicalStatement.author,
          source: 'openehr'
        };
        
        this.personalNote = Object.assign(personalNote, $scope.personalNoteEdit);
        $scope.isEdit = false;
        clinicalstatementsActions.update($scope.patient.id, toUpdate);
        setTimeout(function () {
          $state.go('personalNotes-detail', {
            patientId: $scope.patient.id,
            clinicalStatementIndex: personalNote.sourceId
          });
        }, 1000);
      }
    };
  }
}

const ClinicalstatementsDetailComponent = {
  template: templateClinicalstatementsDetail,
  controller: ClinicalstatementsDetailController
};

ClinicalstatementsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalstatementsActions', 'serviceRequests', 'usSpinnerService'];
export default ClinicalstatementsDetailComponent;