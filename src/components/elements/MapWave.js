//import liraries
import React, { Component, useState, useEffect } from 'react';
import Svg, { Rect, Line } from 'react-native-svg';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';

// My stuff
import { stopRecording, getInfo } from '../../actions/';

// constants
import Colors from '../../constants/Colors';
import Circle from '../../constants/Circle';
import WaveStyle from '../../constants/WaveStyle';
import Samples from '../../constants/RandomArray';

const height = WaveStyle.waveHeight / 2;
const xshift = WaveStyle.barWidth + WaveStyle.margin;

const MapWave = ({ connected, stopRecording, audioSample, getInfo }) => {
    let samples = Samples;
    // const [sec, setSec] = useState(0);
    // const [min, setMin] = useState(0);
    const [upDate, setUpdate] = useState(0);

    const renderWaves = () => {
        return (
            // <ScrollView horizontal={true}>
            <Svg height="100%" width={WaveStyle.waveWidth}>
                {samples.map((sample, key) => {
                    return (
                        // <React.Fragment {...{ key }}>
                        <Rect
                            originY={100}
                            y={height - sample / 2}
                            x={key * xshift}
                            width={WaveStyle.barWidth}
                            height={sample}
                            fill={Colors.rec}
                            {...{ key }}
                        />
                        // {/* <Rect
                        //     y={WaveStyle.waveHeight / 2 + WaveStyle.margin}
                        //     x={
                        //         key *
                        //         (WaveStyle.barWidth + WaveStyle.margin)
                        //     }
                        //     width={WaveStyle.barWidth}
                        //     height={sample}
                        //     stroke="red"
                        // /> */}
                        // </React.Fragment>
                    );
                })}
            </Svg>
            // </ScrollView>
        );
    };

    const renderStopButton = () => {
        return (
            <View style={styles.recBorder}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => {
                        console.log('stop record');
                        getInfo({ connected });
                        stopRecording({ connected });
                    }}>
                    <Circle sq={1} dia={40} style={styles.recButton} />
                </TouchableOpacity>
            </View>
        );
    };

    // const stop = setTimeout(() => {
    //     samples.push(1 * Math.floor(Math.random() * 10 + 1));
    //     samples.shift();
    //     setUpdate(upDate + 1);
    // }, 0.0001);
    samples.push(audioSample);
    samples.shift();
    // const umount = setTimeout(() => {
    //     if (sec > 58) {
    //         setSec(0);
    //         setMin(min + 1);
    //     } else {
    //         setSec(sec + 1);
    //     }
    // }, 1000);

    return (
        <>
            <View style={styles.waveView}>{renderWaves()}</View>

            <View style={styles.waveControlView}>
                {/* <View>
                    <Text style={styles.timer}>{`${min}:${sec}`}</Text>
                </View> */}
                {renderStopButton()}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    waveView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        height: WaveStyle.waveHeight,

        borderWidth: 0,
        borderColor: Colors.rec,
    },
    waveControlView: {
        padding: 0,
        alignItems: 'center',

        borderWidth: 0,
        borderColor: Colors.rec,
    },
    timer: {
        color: 'white',
        fontSize: 24,
    },
    recBorder: {
        padding: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 15,
    },
    recButton: {
        margin: 0,
        backgroundColor: Colors.rec,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,1)',
    },
});

const mapStateToProps = state => {
    const { connected } = state.ble;
    const { audioSample } = state.pnoi;
    return { connected, audioSample };
};

export default connect(mapStateToProps, { stopRecording, getInfo })(MapWave);
