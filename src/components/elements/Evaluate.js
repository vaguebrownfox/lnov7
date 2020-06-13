import React, { Component, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';

import { showEvaluateScreen } from '../../actions/';

const network = require('../../res/network.gif');
const redLungs = require('../../res/redLungs.png');
const greenLungs = require('../../res/greenLungs.png');
import Colors from '../../constants/Colors';
import RoundedText from '../../constants/RoundedText';

const Evaluate = props => {
    const [showGif, setShowGif] = useState(true);

    const renderGif = () => {
        if (showGif) {
            return <Image style={styles.img} source={network} />;
        } else {
            if (Math.random() > 0.5) {
                return (
                    <>
                        <View style={styles.imgLungView}>
                            <TouchableOpacity
                                onPress={() => clearTimeout(evaluating)}>
                                <Image
                                    style={styles.imgLung}
                                    source={redLungs}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.eval}>
                            <Text style={{ ...styles.text, color: Colors.rec }}>
                                Must undergo furthur examination
                            </Text>
                        </View>
                        {renderBackButton()}
                    </>
                );
            } else
                return (
                    <>
                        <View
                            style={{
                                ...styles.imgLungView,
                                borderColor: Colors.crumbs,
                            }}>
                            <TouchableOpacity
                                onPress={() => clearTimeout(evaluating)}>
                                <Image
                                    style={styles.imgLung}
                                    source={greenLungs}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.eval}>
                            <Text
                                style={{
                                    ...styles.text,
                                    color: Colors.crumbs,
                                }}>
                                No Asthma
                            </Text>
                        </View>
                        {renderBackButton()}
                    </>
                );
            // return (
            //     <TouchableOpacity onPress={() => clearTimeout(evaluating)}>
            //         <Text style={styles.text}>Evaluate</Text>
            //     </TouchableOpacity>
            // );
        }
    };
    const renderBackButton = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    clearTimeout(evaluating);
                    props.showEvaluateScreen(false);
                }}>
                <RoundedText
                    text={'back'}
                    textSize={12}
                    style={{
                        ...styles.fin,
                    }}
                />
            </TouchableOpacity>
        );
    };

    const evaluating = setTimeout(() => {
        setShowGif(false);
    }, 4670);

    return <View style={styles.container}>{renderGif()}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#000',
        paddingVertical: 30,

        borderWidth: 0,
        borderColor: Colors.rec,
    },
    img: {
        height: 200,
        width: 200,
    },
    imgLung: {
        height: 200,
        width: 200,
        alignSelf: 'center',
    },
    imgLungView: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        paddingBottom: 20,
        borderWidth: 10,
        borderRadius: 250,
        marginBottom: 10,
        borderColor: Colors.rec,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    eval: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 70,
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

export default connect(null, { showEvaluateScreen })(Evaluate);
