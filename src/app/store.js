import { devToolsEnhancer } from '@redux-devtools/extension';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './rootReducer';

const enhancers = devToolsEnhancer();

const store = createStore(rootReducer, enhancers);

export default store;
