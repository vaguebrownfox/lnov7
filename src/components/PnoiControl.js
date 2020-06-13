import React, { Component } from 'react';
import { View, StyleSheet, Modal, ScrollView } from 'react-native';
import { connect } from 'react-redux';

// My stuff
import { getCurrentData, stopRecording, showEvaluateScreen } from '../actions/';

import Title from './elements/Title';
import About from './elements/About';
import Records from './elements/Records';
//import FlatWave from './elements/FlatWave';
import MapWave from './elements/MapWave';
import Control from './elements/Control';
import Evaluate from './elements/Evaluate';

// constants
import Colors from '../constants/Colors';

class PnoiControl extends Component {
    componentDidMount() {
        this.props.getCurrentData(this.props.asyncKey);
    }

    render() {
        const {
            id,
            asyncKey,
            isRecording,
            stopRecording,
            connected,
            showEvaluate,
            showEvaluateScreen,
        } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Title title={id.name} />
                </View>

                <About />

                <ScrollView>
                    <Records />

                    <Control currentKey={asyncKey} />
                </ScrollView>

                <Modal
                    animationType="slide"
                    visible={isRecording}
                    transparent={true}
                    onRequestClose={() => {
                        stopRecording({ connected });
                    }}>
                    <View style={styles.wavemode}>
                        <MapWave />
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    visible={showEvaluate}
                    transparent={true}
                    onRequestClose={() => {}}>
                    <View style={styles.wavemode}>
                        <Evaluate />
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: Colors.primary,
    },
    title: {
        flexDirection: 'row',
        height: 80,
        elevation: 2,
    },
    wavemode: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => {
    const { connected } = state.ble;
    const { isRecording, currentData } = state.pnoi;
    const { showEvaluate } = state.final;
    return { isRecording, connected, currentData, showEvaluate };
};

export default connect(mapStateToProps, {
    getCurrentData,
    stopRecording,
    showEvaluateScreen,
})(PnoiControl);
