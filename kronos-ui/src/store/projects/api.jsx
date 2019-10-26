import axios from 'axios';

export const listProjects = async () => {
    return axios.get('/api/projects');
};

export const deleteProject = async slug => {
    return axios.delete(`/api/projects/${slug}`);
};

export const createProject = async data => {
    return axios.post('/api/projects/', data);
};

export const updateProject = async (id, data) => {
    return axios.put(`/api/projects/${id}/`, data);
};

export default {
    listProjects,
    deleteProject,
    createProject,
    updateProject,
};
