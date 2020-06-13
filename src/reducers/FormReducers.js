import {
    GET_FORM_DETAILS,
    RESET_FORM,
    LIST_FETCH,
    LIST_CLEAR,
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    list: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_FORM_DETAILS:
            return {
                ...state,
                [action.payload.prop]: action.payload.value,
            };
        case RESET_FORM:
            return {
                ...INITIAL_STATE,
                list: state.list,
            };
        case LIST_FETCH:
            return {
                ...state,
                list: action.payload.reverse(),
            };
        case LIST_CLEAR:
            return {
                ...state,
                list: [],
            };
        default:
            return state;
    }
};
