import { FETCH_RECORDS_READY, FETCH_RECORDS_FAIL } from './types';
import api from './api';

export const fetchRecords = () => async dispatch => {
    try {
        const response = await api.listRecords();
        return dispatch(fetchRecordsReady(response.data));
    } catch (error) {
        return dispatch(fetchRecordsFail(error));
    }
};

export const fetchRecordsReady = records => {
    return {
        type: FETCH_RECORDS_READY,
        records,
    };
};

export const fetchRecordsFail = error => {
    return {
        type: FETCH_RECORDS_FAIL,
        error,
    };
};

export const deleteRecord = id => async dispatch => {
    await api.deleteRecord(id);
    return dispatch(fetchRecords());
};
