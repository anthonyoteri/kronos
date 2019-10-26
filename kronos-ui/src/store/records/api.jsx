import axios from 'axios';

export const createRecord = async data => {
    return axios.post('/api/records/', data);
};

export const listRecords = async () => {
    return axios.get('/api/records');
};

export const updateRecord = async (id, data) => {
    return axios.put(`/api/records/${id}/`, data);
};

export const deleteRecord = async id => {
    return axios.delete(`/api/records/${id}`);
};

export default {
    createRecord,
    listRecords,
    updateRecord,
    deleteRecord,
};
