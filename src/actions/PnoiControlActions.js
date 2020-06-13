import AsyncStorage from '@react-native-community/async-storage';
import { downloadFile, DocumentDirectoryPath } from 'react-native-fs';
import { Base64 } from 'js-base64';

import {
    GET_CURRENT_DATA,
    START_RECORD,
    GET_AUDIO_SAMPLE,
    STOP_RECORD,
    SET_REC_PLACE,
    SHOW_WAVEFORM,
} from './types';

import UUID from '../constants/UUID';

export const getCurrentData = key => {
    return dispatch => {
        getMyValue(key, dispatch);
    };
};

const getMyValue = async (key, dispatch) => {
    try {
        const value = await AsyncStorage.getItem(key);
        console.log('get my val: ', value);
        dispatch({ type: GET_CURRENT_DATA, payload: JSON.parse(value) });
    } catch (err) {
        console.log('get val err: ', err);
    }
};

export const updateInfo = ({ currentKey, currentData, recPlace }) => {
    return dispatch => {
        merge(currentKey, currentData, recPlace, dispatch);
    };
};

const merge = async (key, data, val, dispatch) => {
    if (data.recordings.some(recs => recs === val)) {
        return;
    } else {
        const Data = {
            ...data,
            recordings: [...data.recordings, val],
        };
        try {
            await AsyncStorage.mergeItem(key, JSON.stringify(Data));

            const currentData = await AsyncStorage.getItem(key);
            dispatch({
                type: GET_CURRENT_DATA,
                payload: JSON.parse(currentData),
            });
            console.log('merged?: ', currentData);
        } catch (err) {
            console.log('merge err: ', err);
        }
    }
};

export const setRecPlace = place => {
    return {
        type: SET_REC_PLACE,
        payload: place,
    };
};

export const startRecording = ({ connected, filename }) => {
    console.log('start filename ', filename);
    return dispatch => {
        //console.log(connected);
        if (connected.id !== '0') {
            const filenameB64 = Base64.encode(filename);
            connected
                .writeCharacteristicWithResponseForService(
                    UUID.service,
                    UUID.startRecord,
                    `${filenameB64}`,
                )
                .then(
                    response => {
                        console.log('write value ', response.value);
                        dispatch({ type: START_RECORD });
                    },
                    error => {
                        console.log('write error: ', error);
                    },
                );
        } else {
            console.log('write error: pnoi not connected');
        }
    };
};

export const stopRecording = ({ connected }) => {
    return dispatch => {
        if (connected.id !== '0') {
            const stop = Base64.encode('stop');
            connected
                .writeCharacteristicWithResponseForService(
                    UUID.service,
                    UUID.stopRecord,
                    `${stop}`,
                )
                .then(
                    response => {
                        console.log('stop value ', response.value);
                        dispatch({ type: STOP_RECORD });
                    },
                    error => {
                        console.log('stop error: ', error);
                    },
                );
        } else {
            console.log('stop error: pnoi not connected');
        }
    };
};

export const logMetaData = ({ connected, metaData }) => {
    return dispatch => {
        if (connected.id !== '0') {
            const metaData64 = Base64.encode(metaData);
            connected
                .writeCharacteristicWithResponseForService(
                    UUID.service,
                    UUID.logMetaData,
                    `${metaData64}`,
                )
                .then(
                    response => {
                        console.log('log value ', response.value);
                    },
                    error => {
                        console.log('log error: ', error);
                    },
                );
        } else {
            console.log('log error: pnoi not connected');
        }
    };
};

export const getAudioSample = ({ connected }) => {
    return dispatch => {
        if (connected.id !== '0') {
            const sub = connected.monitorCharacteristicForService(
                UUID.service,
                UUID.stream,
                async (error, characteristic) => {
                    if (error) {
                        console.log('notify error: ', error.message);
                        return;
                    }
                    //const val = new Buffer.alloc(2);
                    const val = Base64.decode(characteristic.value);
                    console.log(
                        'get audio sample action val :',
                        characteristic.value,
                        val,
                    );
                    await dispatch({
                        type: GET_AUDIO_SAMPLE,
                        payload: val,
                        sub,
                    });
                },
            );
            // setTimeout(() => {
            //     sub.remove();
            // }, 30000);
        }
    };
};

export const getInfo = ({ connected }) => {
    return dispatch => {
        if (connected.id !== '0') {
            connected
                .readCharacteristicForService(UUID.service, UUID.read)
                .then(
                    response => {
                        console.log(Base64.decode(response.value));
                    },
                    error => {
                        console.log('read error: ', error);
                    },
                );
        }
    };
};

export const getAudioFile = ({ url, filename }) => {
    return dispatch => {
        downloadFile({
            fromUrl: url,
            toFile: `${DocumentDirectoryPath}/Recordings/Glimmer_Tue-Feb-18-00-07-39-2020_BLT_S.wav`,
        }).catch(error => {
            console.log('fs download: ', error);
        });
    };
};

export const showWave = show => {
    return {
        type: SHOW_WAVEFORM,
        payload: show,
    };
};
