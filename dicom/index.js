/*
 ~  Copyright 2017 Ripple Foundation C.I.C. Ltd
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
import reducer from "./studies-reducer-all";
import imageListComponent from './image-list.component';
import imageDetailComponent from './image-detail.component';
import imageActions from './image-actions';

import studies from './studies-reducer-all';
import series from './series-reducer-all';
import instanceGet from './instance-reducer-get';
import instanceIdGet from './instance-id-reducer-get';
import ServiceActions from "./serviceActions";

export default {
  "name": 'dicom',
  "routes": routes,
  "reducer": reducer,
  "reducers": {
    studies,
    series,
    instanceGet,
    instanceIdGet,
  },
  "components": {
    imageListComponent,
    imageDetailComponent
  },
  "services": {
    serviceActions: ServiceActions
  },
  "actions": {
    imageActions
  },
  "sidebarInfo": {
    name: 'images',
    link: 'images',
    title: 'Images'
  }
}