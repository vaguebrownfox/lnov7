//import liraries
import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button,
    TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';

import { stopRecording } from '../../actions/';

import Colors from '../../constants/Colors';
import Circle from '../../constants/Circle';
let samples = [];
// for (let i = 0; i < 100; i++) {
//     samples.push(Math.floor(Math.random() * 11 + 1));
// }
// create a component
const FlatWave = props => {
    const [upDate, setUpdate] = useState(0);

    const renderItem = ({ item }) => {
        return <View style={{ ...styles.wave, height: item * 10 }} />;
    };

    const renderStopButton = () => {
        return (
            <View style={styles.recBorder}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => {
                        console.log('sss');
                        clearTimeout(umount);
                        props.stopRecording();
                    }}>
                    <Circle sq={1} dia={40} style={styles.rec} />
                </TouchableOpacity>
            </View>
        );
    };

    const umount = setTimeout(() => {
        samples.push(Math.floor(Math.random() * 10 + 1));
        //samples.shift();
        setUpdate(upDate + 1);
    }, 1);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.waveView}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        //
                        removeClippedSubviews={false}
                        maxToRenderPerBatch={1}
                        //
                        keyExtractor={item => `${Math.random()}`}
                        data={[Math.floor(Math.random() * 10 + 1)]}
                        renderItem={renderItem}
                    />
                </View>
            </View>
            <View style={styles.waveControlView}>{renderStopButton()}</View>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 0,
        borderColor: Colors.rec,
    },
    waveView: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 355,

        borderWidth: 0,
        borderColor: Colors.rec,
    },
    wave: {
        flex: 1,
        alignSelf: 'center',
        marginLeft: 1,
        width: 2,
        backgroundColor: Colors.rec,
        borderRadius: 3,
    },
    waveControlView: {
        padding: 10,

        borderWidth: 0,
        borderColor: Colors.rec,
    },
    recBorder: {
        padding: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 20,
    },
    rec: {
        margin: 0,
        backgroundColor: Colors.rec,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,1)',
    },
});

const mapStateToProps = state => {
    const { isRecording } = state.pnoi;
    return { isRecording };
};

//make this component available to the app
export default connect(mapStateToProps, { stopRecording })(FlatWave);
