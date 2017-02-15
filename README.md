#### General Plugin overview
Plugins are extentions to currenly built 'core' (with general modules, that can not be removed) application. They expand the functionality of the application, add necessary features and are used to expand the application for users to fit their needs.   

#### Installation of the new Plugins to the application:  
1. Run the following command within your command line: npm/bower install moduleName (Module name here stands for github url for external plugin)
`bower i --save Org-Ripple-UI-Plugins` or `bower i --save Org-Ripple-UI-Plugins#1.0.0` for current plugin version
*We are downloading the module from external repository to root application directory*

2. To copy files from node_modules/bower_components use: webpack.config.js --> CopyWebpackPlugin, change path in it's options { from: '', to: '' }
*Here we are copying module files from source folder to destination folder*

3. `npm run copy`
*Running the copy command itself*

4. In the src/app/plugins.js we include all modules
```
import clinicalnotes from './rippleui/pages/clinical-notes/index';
export default [
 clinicalnotes
 ]
```
5. Add actions types from module/ActionTypes.js to src/app/constants/ActionTypes.js
*The constants file contains global constants to use within an application, in general the addition to already existing 'core' constant file looks like this:*
```
export const CLINICALNOTES = 'CLINICALNOTES';
export const CLINICALNOTES_SUCCESS = 'CLINICALNOTES_SUCCESS';
export const CLINICALNOTES_ERROR = 'CLINICALNOTES_ERROR';

export const CLINICALNOTES_GET = 'CLINICALNOTES_GET';
export const CLINICALNOTES_GET_SUCCESS = 'CLINICALNOTES_GET_SUCCESS';
export const CLINICALNOTES_GET_ERROR = 'CLINICALNOTES_GET_ERROR';

export const CLINICALNOTES_CREATE = 'CLINICALNOTES_CREATE';
export const CLINICALNOTES_CREATE_SUCCESS = 'CLINICALNOTES_CREATE_SUCCESS';
export const CLINICALNOTES_CREATE_ERROR = 'CLINICALNOTES_CREATE_ERROR';

export const CLINICALNOTES_UPDATE = 'CLINICALNOTES_UPDATE';
export const CLINICALNOTES_UPDATE_SUCCESS = 'CLINICALNOTES_UPDATE_SUCCESS';
export const CLINICALNOTES_UPDATE_ERROR = 'CLINICALNOTES_UPDATE_ERROR';
```

#### Explanations about module functionality files, that should be developed:
1. example-actions.js   
*This file contains actions functions for redux architecture*

2. example-reducer-name.js  
*It contains reducer functions for redux architecture*

3. example-list.component.js   
*It's list.component functionality file (angular 1.5 component)*

4. example-list.html  
*HTML template file for list.component*

5. example-detail.component.js  
*It's detail.component functionality file (angular 1.5 component)*

6. example-detail.html   
*HTML Template file for detail.component*

7. ActionTypes.js
*This file contains actions constants for redux architecture*

8. index.route.js
*File with routes for core application*

9. index.js
*This file contains inclusion for all module files*