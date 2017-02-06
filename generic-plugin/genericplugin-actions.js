import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.GENERIC_PLUGIN, types.GENERIC_PLUGIN_SUCCESS, types.GENERIC_PLUGIN_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/genericplugin'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.GENERIC_PLUGIN_GET, types.GENERIC_PLUGIN_GET_SUCCESS, types.GENERIC_PLUGIN_GET_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/genericplugin/' + compositionId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.GENERIC_PLUGIN_CREATE, types.GENERIC_PLUGIN_CREATE_SUCCESS, types.GENERIC_PLUGIN_CREATE_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/genericplugin',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.GENERIC_PLUGIN_UPDATE, types.GENERIC_PLUGIN_UPDATE_SUCCESS, types.GENERIC_PLUGIN_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/genericplugin',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function genericpluginActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

genericpluginActions.$inject = ['$ngRedux'];