import {
    GET_CURRENT_DATA,
    START_RECORD,
    GET_AUDIO_SAMPLE,
    STOP_RECORD,
    SET_REC_PLACE,
    SHOW_WAVEFORM,
} from '../actions/types';

const INITIAL_STATE = {
    currentData: {},
    isRecording: false,
    showWaveform: false,
    recPlace: '',
    filename: '',
    audioSample: 0,
    sub: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CURRENT_DATA:
            return {
                ...state,
                currentData: action.payload,
                recPlace: '',
                filename: '',
            };
        case SET_REC_PLACE:
            const name = state.currentData.name.replace(/ /g, '_');
            const timeStamp = state.currentData.timeStamp;
            const place = action.payload;
            return {
                ...state,
                recPlace: place,
                filename: `${name}_${timeStamp}_${place}`,
            };
        case START_RECORD:
            return {
                ...state,
                isRecording: true,
            };
        case GET_AUDIO_SAMPLE:
            //console.log('get audio sample reducer: ', action.payload);
            return {
                ...state,
                audioSample: action.payload,
                sub: action.sub,
            };
        case STOP_RECORD:
            try {
                state.sub.remove();
            } catch {
                console.log('unsub error');
            }
            return {
                ...state,
                isRecording: false,
            };
        case SHOW_WAVEFORM:
            return {
                ...state,
                showWaveform: action.payload,
            };
        default:
            return state;
    }
};
