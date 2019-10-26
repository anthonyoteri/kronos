import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import projectsReducer from './projects/reducer';
import recordsReducer from './records/reducer';

export const createRootReducer = () =>
    combineReducers({
        projects: projectsReducer,
        records: recordsReducer,
    });

export const store = createStore(createRootReducer(), applyMiddleware(thunk));
