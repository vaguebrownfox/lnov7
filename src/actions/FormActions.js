import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import { GET_FORM_DETAILS, RESET_FORM, LIST_FETCH, LIST_CLEAR } from './types';

export const getFormDetails = ({ prop, value }) => {
    return {
        type: GET_FORM_DETAILS,
        payload: { prop, value },
    };
};

export const resetForm = () => {
    return {
        type: RESET_FORM,
    };
};

export const storeDetails = ({ name, age, gender, height, weight }) => {
    return dispatch => {
        asyncSet({ name, age, gender, height, weight });
        dispatch(resetForm());
        Actions.brelungrecs({ type: 'reset' });
    };
};

const asyncSet = async ({ name, age, gender, height, weight }) => {
    const atimeStamp = `${new Date()
        .toLocaleString()
        .replace(/ /g, '-')
        .replace(/:/g, '-')}`;
    let Data = {
        key: { atimeStamp: atimeStamp, name: name },
        timeStamp: atimeStamp,
        name: name,
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        recordings: [],
    };
    const asyncKey = JSON.stringify(Data.key);
    const asyncData = JSON.stringify(Data);
    try {
        await AsyncStorage.setItem(asyncKey, asyncData);
    } catch (error) {
        console.log('async storage err in asyncSet form action: ', error);
    }
};

export const ListFetch = () => {
    return dispatch => {
        getAllKeys(dispatch);
    };
};

const getAllKeys = async dispatch => {
    let keys = [];
    try {
        keys = await AsyncStorage.getAllKeys();
    } catch (err) {
        console.log('get all k err: ', err);
    }
    dispatch({ type: LIST_FETCH, payload: keys });
};

export const removeFromList = key => {
    return dispatch => {
        removeValue(key);
    };
};

const removeValue = async key => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log('remove error :', e);
    }
};

export const clearList = () => {
    return dispatch => {
        clearAll(dispatch);
    };
};

const clearAll = async dispatch => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log('clear err', e);
    }
    dispatch({ type: LIST_CLEAR });
    console.log('All cleared');
};
