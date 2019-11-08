import { API_ERROR, FETCH_PROJECTS_READY, REFRESH_PROJECT_READY, DELETE_PROJECT_READY } from './types';
import api from './api';

export const apiError = error => ({
    type: API_ERROR,
    error,
});

export const fetchProjects = () => async dispatch => {
    try {
        const response = await api.listProjects();
        return dispatch(fetchProjectsReady(response.data));
    } catch (error) {
        return dispatch(apiError(error));
    }
};

export const refreshProject = slug => async dispatch => {
    try {
        const response = await api.getProject(slug);
        return dispatch(refreshProjectReady(response.data));
    } catch (error) {
        return dispatch(apiError(error));
    }
};

export const createProject = project => async dispatch => {
    try {
        const response = await api.createProject(project);
        return dispatch(refreshProject(response.data.slug));
    } catch (error) {
        return dispatch(apiError(error));
    }
};

export const updateProject = project => async dispatch => {
    try {
        await api.updateProject(project.slug, project);
        return dispatch(refreshProject(project.slug));
    } catch (error) {
        return dispatch(apiError(error));
    }
};

export const deleteProject = slug => async dispatch => {
    try {
        await api.deleteProject(slug);
        return dispatch(deleteProjectReady(slug));
    } catch (error) {
        return dispatch(apiError(error));
    }
};

export const fetchProjectsReady = projects => ({
    type: FETCH_PROJECTS_READY,
    projects,
});

export const refreshProjectReady = project => ({
    type: REFRESH_PROJECT_READY,
    project,
});

export const deleteProjectReady = slug => ({
    type: DELETE_PROJECT_READY,
    slug: slug,
});
