import { SHOW_EVALUATE } from '../actions/types';

export const showEvaluateScreen = show => {
    return {
        type: SHOW_EVALUATE,
        payload: show,
    };
};
