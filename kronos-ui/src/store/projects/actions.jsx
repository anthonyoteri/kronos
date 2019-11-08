import { FETCH_PROJECTS_FAIL, FETCH_PROJECTS_READY, REFRESH_PROJECT_READY, REFRESH_PROJECT_FAIL } from './types';
import api from './api';

export const fetchProjects = () => async dispatch => {
    try {
        const response = await api.listProjects();
        return dispatch(fetchProjectsReady(response.data));
    } catch (error) {
        return dispatch(fetchProjectsFail(error));
    }
};

export const fetchProjectsReady = projects => ({
    type: FETCH_PROJECTS_READY,
    projects,
});

export const fetchProjectsFail = error => ({
    type: FETCH_PROJECTS_FAIL,
    error,
});

export const refreshProject = slug => async dispatch => {
    try {
        const response = await api.getProject(slug);
        return dispatch(refreshProjectReady(response.data));
    } catch (error) {
        return dispatch(refreshProjectFail(error));
    }
};

export const refreshProjectReady = project => ({
    type: REFRESH_PROJECT_READY,
    project,
});

export const refreshProjectFail = error => ({
    type: REFRESH_PROJECT_FAIL,
    error,
});

export const deleteProject = slug => async dispatch => {
    await api.deleteProject(slug);
    return dispatch(fetchProjects());
};

export const createProject = project => async dispatch => {
    await api.createProject(project);
    return dispatch(fetchProjects());
};

export const updateProject = project => async dispatch => {
    await api.updateProject(project.slug, project);
    return dispatch(refreshProject(project.slug));
};
