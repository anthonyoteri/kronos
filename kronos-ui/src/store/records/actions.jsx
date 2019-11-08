import { API_ERROR, FETCH_RECORDS_READY, REFRESH_RECORD_READY, DELETE_RECORD_READY } from './types';
import api from './api';

export const createRecord = record => async dispatch => {
    try {
        const response = await api.createRecord(record);
        return dispatch(refreshRecord(response.data.id));
    } catch (error) {
        return dispatch(apiError(error));
    }
};

export const fetchRecords = () => async dispatch => {
    try {
        const response = await api.listRecords();
        return dispatch(fetchRecordsReady(response.data));
    } catch (error) {
        return dispatch(apiError(error));
    }
};

export const updateRecord = record => async dispatch => {
    try {
        await api.updateRecord(record.id, record);
        return dispatch(refreshRecord(record.id));
    } catch (error) {
        return dispatch(apiError(error));
    }
};

export const refreshRecord = id => async dispatch => {
    try {
        const response = await api.getRecord(id);
        return dispatch(refreshRecordReady(response.data));
    } catch (error) {
        return dispatch(apiError(error));
    }
};

export const deleteRecord = id => async dispatch => {
    try {
        await api.deleteRecord(id);
        return dispatch(deleteRecordReady(id));
    } catch (error) {
        return dispatch(apiError(error));
    }
};

export const apiError = error => ({
    type: API_ERROR,
    error,
});

export const fetchRecordsReady = records => ({
    type: FETCH_RECORDS_READY,
    records,
});

export const refreshRecordReady = record => ({
    type: REFRESH_RECORD_READY,
    record,
});

export const deleteRecordReady = id => ({
    type: DELETE_RECORD_READY,
    id: id,
});
