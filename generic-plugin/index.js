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
import routes from "./index.route";
import reducer from "./genericplugin-reducer-all";
import genericpluginListComponent from './genericplugin-list.component';
import genericpluginCreateComponent from './genericplugin-create.component';
import genericpluginDetailComponent from './genericplugin-detail.component';
import genericpluginActions from './genericplugin-actions';

export default {
    "name": 'genericplugin',
    "routes": routes,
    "reducer": reducer,
    "components": {
        genericpluginListComponent,
        genericpluginCreateComponent,
        genericpluginDetailComponent
    },
    "actions": {
        genericpluginActions
    },
    "sidebarInfo": {
        name: 'genericplugin',
        link: 'genericplugin',
        linkDetail: 'genericplugin-detail',
        title: 'Generic plugin'
    }
}