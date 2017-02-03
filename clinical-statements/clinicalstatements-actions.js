import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.CLINICALSTATEMENTS, types.CLINICALSTATEMENTS_SUCCESS, types.CLINICALSTATEMENTS_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/clinicalStatements'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.CLINICALSTATEMENTS_GET, types.CLINICALSTATEMENTS_GET_SUCCESS, types.CLINICALSTATEMENTS_GET_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/clinicalStatements/' + compositionId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.CLINICALSTATEMENTS_CREATE, types.CLINICALSTATEMENTS_CREATE_SUCCESS, types.CLINICALSTATEMENTS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/clinicalStatements',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.CLINICALSTATEMENTS_UPDATE, types.CLINICALSTATEMENTS_UPDATE_SUCCESS, types.CLINICALSTATEMENTS_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/clinicalStatements',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function query(prefix='', tag='') {
  let queryString = [];
  if(tag) {    queryString.push('tag=' + encodeURIComponent(tag)); }
  if(prefix) { queryString.push('prefix=' + encodeURIComponent(prefix));}
  return {
    types: [types.CLINICALSTATEMENTS_QUERY, types.CLINICALSTATEMENTS_QUERY_SUCCESS, types.CLINICALSTATEMENTS_QUERY_ERROR],
    
    config: {
      method: 'get',
      url: '/api-clinicalContent/phrases?' + queryString.join('&')
    },

    meta: {
      timestamp: Date.now()
    }
  }
}

export default function clinicalstatementsActions($ngRedux) {
  let actionCreator = {
    all, get, create, update, query
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

clinicalstatementsActions.$inject = ['$ngRedux'];