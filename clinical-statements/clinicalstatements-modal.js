export default function ClinicalstatementsModal($uibModal, clinicalstatementsActions, $stateParams) {
  var isModalClosed = true;

  var openModal = function (patient, modal, clinicalStatement, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./clinicalstatements-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {

          $scope.currentUser = currentUser;
          $scope.clinicalStatement = clinicalStatement;
          $scope.patient = patient;
          $scope.modal = modal;

          if (modal.title === 'Edit Clinical Statement') {
            $scope.isEdit = true;
            $scope.clinicalStatement.dateCreated = new Date($scope.clinicalStatement.dateCreated).toISOString().slice(0, 10);
          }
          else {
            $scope.isEdit = false;
            $scope.clinicalStatement.dateCreated = new Date().toISOString().slice(0, 10);
          }

          $scope.ok = function (clinicalStatementForm, clinicalStatement) {
            $scope.formSubmitted = true;

            if (clinicalStatementForm.$valid) {
              $uibModalInstance.close(clinicalStatement);
            }

            let toAdd = {
              type: clinicalStatement.type,
              statement: clinicalStatement.statement,
              dateCreated: clinicalStatement.dateCreated,
              author: clinicalStatement.author,
              source: 'openehr'
            };

            if (clinicalStatementForm.$valid) {

              $uibModalInstance.close(clinicalStatement);

              if ($scope.isEdit) {
                let toUpdate = {
                  type: clinicalStatement.type,
                  statement: clinicalStatement.statement,
                  author: clinicalStatement.author,
                  source: clinicalStatement.source,
                  sourceId: clinicalStatement.sourceId
                };
                
                $scope.clinicalstatementsUpdate($scope.patient.id, toUpdate);
                setTimeout(function () {
                  $state.go('clinicalStatements-detail', {
                    patientId: $scope.patient.id,
                    clinicalStatementIndex: clinicalStatement.sourceId
                  });
                }, 1000);
              } else {
                $scope.clinicalstatementsCreate($scope.patient.id, toAdd);
                setTimeout(function () {
                  $state.go('clinicalStatements', {
                    patientId: $scope.patient.id,
                    filter: $scope.query,
                    page: $scope.currentPage,
                    reportType: $stateParams.reportType,
                    searchString: $stateParams.searchString,
                    queryType: $stateParams.queryType
                  });
                }, 1000);
              }
            }
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.clinicalstatementsCreate = clinicalstatementsActions.create;
          $scope.clinicalstatementsUpdate = clinicalstatementsActions.update;
        }
      });
    }

    modalInstance.result.then(function() {
      isModalClosed = true;
    }, function() {
      isModalClosed = true;
    });

  };

  return {
    isModalClosed: isModalClosed,
    openModal: openModal
  };
}
ClinicalstatementsModal.$inject = ['$uibModal', 'clinicalstatementsActions', '$stateParams'];