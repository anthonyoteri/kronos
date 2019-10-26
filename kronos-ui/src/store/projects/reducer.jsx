import { FETCH_PROJECTS_READY } from './types';

const initialState = {
    list: [],
};

export const projectsReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_PROJECTS_READY:
            return { ...state, list: actions.projects };
        default:
            return state;
    }
};

export default projectsReducer;
