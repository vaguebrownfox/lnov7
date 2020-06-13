import { SEARCH, ADD_BLE, REFRESH_BLE, CONNECTED_BLE } from './types';

export const search = mode => {
    return {
        type: SEARCH,
        payload: mode,
    };
};

export const addBle = device => {
    return { type: ADD_BLE, payload: device };
};

export const refreshBle = () => {
    return {
        type: REFRESH_BLE,
    };
};

export const connectedBle = device => {
    return {
        type: CONNECTED_BLE,
        payload: device,
    };
};

export const startBleScan = () => {
    return (dispatch, getState, DeviceManager) => {
        const subscription = DeviceManager.onStateChange(state => {
            if (state === 'PoweredOn') {
                console.log('start scan');
                dispatch(scanBle());
                subscription.remove();
            }
        }, true);
    };
};

export const scanBle = () => {
    return (dispatch, getState, DeviceManager) => {
        DeviceManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log(error);
            }
            if (device !== null) {
                dispatch(addBle(device));
            }
        });
    };
};

export const connectBle = device => {
    return (dispatch, getState, DeviceManager) => {
        DeviceManager.stopDeviceScan();
        device
            .connect()
            .then(device => {
                let characteristics = device.discoverAllServicesAndCharacteristics();
                console.log('characteristics:', characteristics);
                return characteristics;
            })
            .then(
                device => {
                    dispatch(connectedBle(device));
                    return device;
                },
                error => {
                    console.log('SCAN: ', error);
                    dispatch(refreshBle());
                },
            );
    };
};
