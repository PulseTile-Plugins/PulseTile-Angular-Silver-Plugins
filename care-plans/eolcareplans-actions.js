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
    types: [types.EOLCAREPLANS, types.EOLCAREPLANS_SUCCESS, types.EOLCAREPLANS_ERROR],

    shouldCallAPI: (state) => !state.eolcareplans.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/eolcareplans'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.EOLCAREPLANS_GET, types.EOLCAREPLANS_GET_SUCCESS, types.EOLCAREPLANS_GET_ERROR],

    shouldCallAPI: (state) => !state.eolcareplans.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/eolcareplans/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.EOLCAREPLANS_CREATE, types.EOLCAREPLANS_CREATE_SUCCESS, types.EOLCAREPLANS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.eolcareplans.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/eolcareplans',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.EOLCAREPLANS_UPDATE, types.EOLCAREPLANS_UPDATE_SUCCESS, types.EOLCAREPLANS_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.eolcareplans.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/eolcareplans',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function eolcareplansActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

eolcareplansActions.$inject = ['$ngRedux'];