import { FETCH_RECORDS_READY, FETCH_RECORDS_FAIL, REFRESH_RECORD_READY, REFRESH_RECORD_FAIL } from './types';
import api from './api';
import moment from 'moment';

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
        records: records.map(r => ({
            ...r,
            startTime: moment(r.startTime),
            stopTime: r.stopTime ? moment(r.stopTime) : null,
        })),
    };
};

export const fetchRecordsFail = error => {
    return {
        type: FETCH_RECORDS_FAIL,
        error,
    };
};

export const refreshRecord = id => async dispatch => {
    try {
        const response = await api.getRecord(id);
        return dispatch(refreshRecordReady(response.data));
    } catch (error) {
        return dispatch(refreshRecordFail(error));
    }
};

export const refreshRecordReady = record => {
    return {
        type: REFRESH_RECORD_READY,
        record: {
            ...record,
            startTime: moment(record.startTime),
            stopTime: record.stopTime ? moment(record.stopTime) : null,
        },
    };
};

export const refreshRecordFail = error => {
    return {
        type: REFRESH_RECORD_FAIL,
        error,
    };
};

export const deleteRecord = id => async dispatch => {
    await api.deleteRecord(id);
    return dispatch(fetchRecords());
};

export const createRecord = record => async dispatch => {
    await api.createRecord(record);
    return dispatch(fetchRecords());
};

export const updateRecord = record => async dispatch => {
    await api.updateRecord(record.id, record);
    return dispatch(refreshRecord(record.id));
};
