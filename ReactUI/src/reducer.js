import job from './reducers/job';
import jobList from './reducers/jobList';
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  job,
  jobList,
  auth,
  common,
  editor,
  home,
  profile,
  settings,
  router: routerReducer
});
