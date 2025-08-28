import { createStore, combineReducers } from 'redux';
import { datasetsReducer, analysesReducer } from './reducers';


const rootReducer = combineReducers({ datasets: datasetsReducer, analyses: analysesReducer });
export const store = createStore(rootReducer);