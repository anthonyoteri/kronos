import { FETCH_PROJECTS_READY, REFRESH_PROJECT_READY, DELETE_PROJECT_READY } from './types';
import moment from 'moment';

const initialState = {
    list: [],
};

export const projectsReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_PROJECTS_READY:
            return { ...state, list: actions.projects };
        case REFRESH_PROJECT_READY:
            const projectList = state.list.filter(p => p.slug !== actions.project.slug);
            return {
                ...state,
                list: [...projectList, actions.project].sort((a, b) =>
                    moment(a.created).isBefore(moment(b.created)) ? 1 : -1
                ),
            };
        case DELETE_PROJECT_READY:
            const list = state.list.filter(p => p.slug !== actions.slug);
            return { ...state, list };
        default:
            return state;
    }
};

export default projectsReducer;
