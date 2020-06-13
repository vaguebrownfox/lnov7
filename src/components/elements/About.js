import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// constants
import Colors from '../../constants/Colors';

const About = props => {
    const {
        name,
        age,
        gender,
        height,
        weight,
        timeStamp = '',
    } = props.currentData;

    return (
        <View style={styles.abt}>
            <View style={styles.subabt}>
                <Text style={styles.abtTextVal}>
                    {timeStamp.replace(/-/g, ' ')}
                </Text>
            </View>
            <View style={styles.subabt}>
                <Text style={styles.abtText}>Age: </Text>
                <Text style={styles.abtTextVal}>{age + ' yrs'}</Text>
                <Text style={styles.abtText}>Gender: </Text>
                <Text style={styles.abtTextVal}>{gender}</Text>
            </View>
            <View style={styles.subabt}>
                <Text style={styles.abtText}>Height: </Text>
                <Text style={styles.abtTextVal}>{height + ' cm'}</Text>
                <Text style={styles.abtText}>Weight: </Text>
                <Text style={styles.abtTextVal}>{weight + ' kg'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    abt: {
        margin: 3,
        padding: 3,
        borderRadius: 5,
        backgroundColor: Colors.secondary,
    },
    subabt: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 0,
    },
    abtText: {
        color: Colors.base,
    },
    abtTextVal: {
        color: Colors.accent,
        fontWeight: '900',
        fontSize: 14,
    },
});

const mapStateToProps = state => {
    const { currentData } = state.pnoi;
    return { currentData };
};

export default connect(mapStateToProps)(About);
