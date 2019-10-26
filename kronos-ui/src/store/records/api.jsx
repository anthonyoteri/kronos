import axios from 'axios';

export const listRecords = async () => {
    return axios.get('/api/records');
};

export const deleteRecord = async id => {
    return axios.delete(`/api/records/${id}`);
};

export default {
    listRecords,
    deleteRecord,
};
