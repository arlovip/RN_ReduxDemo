import {combineReducers} from 'redux';
import {nameReducer} from './NameReducer';

const rootReducer = combineReducers({
    nameReducer,
});

export default rootReducer;
