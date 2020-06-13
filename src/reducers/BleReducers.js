import { SEARCH, ADD_BLE, REFRESH_BLE, CONNECTED_BLE } from '../actions/types';

const INITIAL_STATE = {
    searchMode: false,
    bleList: [],
    connected: { id: '0' },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                searchMode: action.payload,
            };

        case ADD_BLE:
            if (
                state.bleList.some(device => device.id === action.payload.id) ||
                action.payload.name === null
            ) {
                return state;
            } else {
                const newBLE = [action.payload, ...state.bleList];
                return {
                    ...state,
                    bleList: newBLE,
                };
            }

        case REFRESH_BLE:
            try {
                state.connected.cancelConnection().catch(err => {
                    console.log('refresh err: ', err);
                });
            } catch (error) {
                console.log('cancel: ', error);
            }
            return {
                ...state,
                bleList: [],
                connected: { id: '0' },
            };

        case CONNECTED_BLE:
            return {
                ...state,
                connected: action.payload,
            };

        default:
            return state;
    }
};
