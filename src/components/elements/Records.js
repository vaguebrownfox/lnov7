import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
//import WaveForm from 'react-native-audiowaveform';

import { downloadFile, DocumentDirectoryPath } from 'react-native-fs';
import { connect } from 'react-redux';

import { getAudioFile, showWave } from '../../actions/';

//constants
import Colors from '../../constants/Colors';
import TextSizes from '../../constants/TextSizes';

const Records = ({
    getAudioFile,
    showWaveform,
    filename,
    showWave,
    currentData,
}) => {
    const url =
        'http://192.168.43.41:3000/Glimmer_Tue-Feb-18-00-07-39-2020_BLT_S.wav';
    console.log('rec filename: ', filename);
    //getAudioFile({ url, filename });
    const renderList = () => {
        if (currentData.recordings !== undefined) {
            return currentData.recordings.map((rec, key) => (
                <View style={styles.element} key={key}>
                    <TouchableOpacity>
                        <View style={styles.nameView}>
                            <Text style={styles.name}>{rec}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ));
        } else return <></>;
    };

    return (
        <View style={styles.container}>
            {renderList()}
            <Modal
                animationType="fade"
                visible={showWaveform}
                transparent={true}
                onRequestClose={() => {
                    showWave(false);
                }}>
                <View style={styles.waveformShow}></View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 222,
        backgroundColor: Colors.primary,
    },
    waveformShow: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    element: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        width: 300,
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: Colors.secondary,

        borderWidth: 0,
        borderColor: '#fff',
    },
    nameView: {
        flexDirection: 'column',
        paddingHorizontal: 20,

        borderWidth: 0,
        borderColor: '#fff',
    },
    name: {
        fontSize: 18,
        color: Colors.accent,
    },
});

const mapStateToProps = state => {
    const { showWaveform, filename, currentData } = state.pnoi;
    return { showWaveform, filename, currentData };
};

export default connect(mapStateToProps, { getAudioFile, showWave })(Records);
