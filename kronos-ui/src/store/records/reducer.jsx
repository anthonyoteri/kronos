import { FETCH_RECORDS_READY } from './types';

const initialState = {
    list: [],
};

export const recordsReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_RECORDS_READY:
            return { ...state, list: actions.records };
        default:
            return state;
    }
};

export default recordsReducer;
