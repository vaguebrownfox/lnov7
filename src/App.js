import React, { Component } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { mkdir, DocumentDirectoryPath } from 'react-native-fs';

// My stuff
import rootReducer from './reducers';
import Router from './Router';

const DeviceManager = new BleManager(); // creating a BLE device manager

const path = `${DocumentDirectoryPath}/Recordings`; // path for storing recorded files
mkdir(path).catch(error => {
    console.log('error :', error);
});

const store = createStore(
    rootReducer,
    applyMiddleware(ReduxThunk.withExtraArgument(DeviceManager)),
); // store to access all application state data (ble, form, pnoi)

const App: () => React$Node = () => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
};

export default App;

//                 • What does the fox say ? •
//  /¯      ∆__∆    ˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘
//  \_______\··/
//  /¬ ¬  ¬  \/
//  \¬_„_„„_¬„/
//  / |    | |
// /  /    / |
// ˘  ˘   ˘  ˘
//  J_Fox

// $ keytool -genkey -v -keystore lno-release-key.keystore -alias lno-key-alias -keyalg RSA -keysize 2048 -validity 10000
// pw: organicmonster
