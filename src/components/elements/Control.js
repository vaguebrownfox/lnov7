import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
    startRecording,
    setRecPlace,
    getAudioSample,
    updateInfo,
    showEvaluateScreen,
} from '../../actions/';

import Colors from '../../constants/Colors';
import Circle from '../../constants/Circle';
import RoundedText from '../../constants/RoundedText';

const Control = props => {
    //console.log(props.connected);
    const renderButton = title => {
        const { recPlace, setRecPlace } = props;
        return (
            <TouchableOpacity onPress={() => setRecPlace(title)}>
                <RoundedText
                    text={title}
                    textSize={13}
                    style={{
                        ...styles.buttonStyle,
                        backgroundColor:
                            title === recPlace ? Colors.base : Colors.primary,
                    }}
                />
            </TouchableOpacity>
        );
    };
    const renderRecButton = () => {
        const {
            connected,
            filename,
            startRecording,
            getAudioSample,
            updateInfo,
            currentKey,
            recPlace,
            currentData,
        } = props;
        return (
            <View style={styles.recBorder}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => {
                        console.log('p');
                        if (recPlace !== '') {
                            updateInfo({ currentKey, currentData, recPlace });
                            startRecording({
                                connected,
                                filename,
                            });
                            getAudioSample({ connected });
                        } else return;
                    }}>
                    <Circle dia={50} style={styles.rec} />
                </TouchableOpacity>
            </View>
        );
    };
    const renderEvalButton = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.showEvaluateScreen(true);
                }}>
                <RoundedText
                    text={'Evaluate'}
                    textSize={12}
                    style={{
                        ...styles.fin,
                        borderColor: Colors.crumbs,
                    }}
                />
            </TouchableOpacity>
        );
    };
    const renderBackButton = () => {
        return (
            <TouchableOpacity
                onPress={() => Actions.brelungrecs({ type: 'reset' })}>
                <RoundedText
                    text={'Finish'}
                    textSize={12}
                    style={{
                        ...styles.fin,
                    }}
                />
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                {renderButton('BLT')}
                {renderButton('BRT')}
                {renderButton('BRB')}
                {renderButton('BLB')}
            </View>
            {renderRecButton()}
            {renderEvalButton()}
            {renderBackButton()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',

        borderWidth: 0,
        borderColor: Colors.rec,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonStyle: {
        alignSelf: 'center',
        width: 55,
        height: 30,
        borderWidth: 1,
        borderRadius: 30,
        paddingBottom: 2,
        elevation: 5,
        margin: 20,
    },
    recBorder: {
        padding: 1,
        backgroundColor: '#fff',
        borderRadius: 50,
        margin: 20,
    },
    rec: {
        margin: 0,
        backgroundColor: Colors.rec,
        borderWidth: 2,
        borderColor: Colors.primary,
    },

    fin: {
        alignSelf: 'center',
        width: 140,
        height: 40,
        borderRadius: 30,
        paddingBottom: 2,
        paddingRight: 3,
        elevation: 2,
        margin: 20,
        backgroundColor: 'rgba(0,0,0,0)',

        borderWidth: 1,
        borderColor: Colors.rec,
    },
});

const mapStateToProps = state => {
    const { connected } = state.ble;
    const { recPlace, filename, currentData } = state.pnoi;
    const { showEvaluate } = state.final;
    return { connected, recPlace, filename, currentData, showEvaluate };
};

//make this component available to the app
export default connect(mapStateToProps, {
    startRecording,
    setRecPlace,
    getAudioSample,
    updateInfo,
    showEvaluateScreen,
})(Control);
