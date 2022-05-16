import { combineReducers } from 'redux';
import { findHousesReducer } from './find-houses';

export const rootReducer = combineReducers({
    findHouses: findHousesReducer,
});