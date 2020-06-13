import { SHOW_EVALUATE } from '../actions/types';

const INITIAL_STATE = {
    showEvaluate: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_EVALUATE:
            console.log(action);
            return {
                ...state,
                showEvaluate: action.payload,
            };

        default:
            return state;
    }
};
