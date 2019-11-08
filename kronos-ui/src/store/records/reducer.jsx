import { FETCH_RECORDS_READY, REFRESH_RECORD_READY } from './types';
import moment from 'moment';

const initialState = {
    list: [],
};

export const recordsReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_RECORDS_READY:
            return { ...state, list: actions.records };
        case REFRESH_RECORD_READY:
            const recordList = [...state.list].filter(r => r.id !== actions.record.id);
            return {
                ...state,
                list: [...recordList, actions.record].sort((a, b) =>
                    moment(a.startTime).isBefore(moment(b.startTime)) ? 1 : -1
                ),
            };
        default:
            return state;
    }
};

export default recordsReducer;
