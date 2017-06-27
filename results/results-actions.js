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
import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.RESULTS, types.RESULTS_SUCCESS, types.RESULTS_ERROR],

    shouldCallAPI: (state) => !state.results.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/labresults'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.RESULTS_GET, types.RESULTS_GET_SUCCESS, types.RESULTS_GET_ERROR],

    shouldCallAPI: (state) => !state.results.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/labresults/' + compositionId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function resultsActions($ngRedux) {
  let actionCreator = {
    all, get
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

resultsActions.$inject = ['$ngRedux'];