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
let _ = require('underscore');

// Todo - Use a service to get the latest tag names
const TAG_NAMES = [
  "PC", "XM", "Ix", "Vitals", "Rx", "Ortho", "Dx", "Meds", "MH", "HA", "Shoulder"
]

class ClinicalstatementsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalstatementsActions, serviceRequests) {
    $scope.clinicalStatement = {};
    $scope.clinicalStatement.statements = [];
    $scope.isString = angular.isString
    $scope.isObject = angular.isObject
    $scope.clinicalStatement.dateCreated = new Date().toISOString().slice(0, 10);
    
    this.currentPage = 1;

    this.setCurrentPageData = function (data) {
      this.searchResults = data.clinicalStatements.searchData;

      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
    };

    /**
     * Take a supplied clinical phrase which could contain any of the following
     * delimiters:
     *   ~SUBJECT~
     *   |VALUE|
     *   {UNIT}
     * and returns the phrase in a processed array form, where the fixed strings
     * are string values and the variables are defined as an object representation
     */
    this.parsePhrase = function(phrase) {
      let variables = { 
        subject: /\~[^|{]*?\~/,
        value:   /\|[^~{]*?\|/,
        unit:    /\{[^~|]*?\}/
      };

      let parts = [phrase];

      _.each(variables, (regex, type) => {
        parts = _.flatten(_.map(parts, (p) => {
          let match = regex.exec(p);
          if(match) {
            let before = p.slice(0,match.index);
            let variable = { type, value: match[0].slice(1,-1) };
            let after = p.substring(match.index + match[0].length);
            return _.reject([before, variable, after], _.isEmpty);
          }
          else {
            return p
          }
        }));
      })
      return parts;
    }

    /**
     * Takes the UI phrases array (custom statements are strings and templated
     * values are parsed objects) and converts in to a format to be sent ready
     * to be sent to the api for persistence
     */
    this.transformPhrases = function(phrases) {
      return _.map(phrases, (p) =>{
        if(_.isString(p)) {
          return {id: null, subject: p}
        }
        else {
          let varHash = _
            .chain(p.parsed)
            .reject(_.isString)
            .map((v)=>[v.type, v.value])
            .object()
            .value();
          return Object.assign({id: p.id}, varHash);
        }
      });
    }

    /**
     * Listen for an enter key in the custom statement input box. When detected,
     * add a new statement and clear the statement content
     */
    this.keyDownCustomStatement = function(evt) {
      if(evt.keyCode === 13) {
        this.addStatement($scope.clinicalStatement.customStatement);
        delete $scope.clinicalStatement.customStatement;
      }
    };

    this.addStatement = function(result) {
      if(angular.isString(result)) {
        $scope.clinicalStatement.statements.push(result);
      }
      else {
        $scope.clinicalStatement.statements.push({
          parsed: this.parsePhrase(result.phrase),
          id:     result.id
        });
      }
    };

    this.removeStatement = function(pos) {
      $scope.clinicalStatement.statements.splice(pos, 1);
    };

    /**
     * Evaluate the current search expression. Look for a tag at the begining
     * of the query, if one is found remove it from the query and set as the 
     * tag to search in.
     */
    this.checkExpression = function(input) {
      if(!$scope.clinicalStatement.tag) {
        let tag = _.find(TAG_NAMES, t => input.startsWith(t + ' '));
        let query = (tag) ? input.substring(tag.length + 1) : input;

        Object.assign($scope.clinicalStatement, {query, tag});
      }
    };

    this.performClinicalSearch = function() {
      let {query, tag} = $scope.clinicalStatement;
      $scope.clinicalstatementsQuery(query,tag);
    }

    /**
     * Event handler for removing the tag being used for search
     */
    this.removeTag = function() {
      delete $scope.clinicalStatement.tag;
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
      let apiStatements = this.transformPhrases(clinicalStatement.statements);
      console.log(apiStatements);

      let toAdd = {
        statements: apiStatements,
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

    // Listen to the change in the query and tag and then perform a search
    $scope.$watch('[clinicalStatement.query,clinicalStatement.tag]',
      _.debounce(this.performClinicalSearch, 300)
    );

    $scope.clinicalstatementsCreate = clinicalstatementsActions.create;
    $scope.clinicalstatementsQuery = clinicalstatementsActions.query;
  }
}

const ClinicalstatementsCreateComponent = {
  template: templateClinicalstatementsCreate,
  controller: ClinicalstatementsCreateController
};

ClinicalstatementsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalstatementsActions', 'serviceRequests'];
export default ClinicalstatementsCreateComponent;
