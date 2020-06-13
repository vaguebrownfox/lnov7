//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

// constants
import Colors from '../../constants/Colors';

const Input = ({ inputType }) => {
    const { style, label, value, onChangeText, secureTextEntry } = inputType;
    return (
        <View style={{ ...styles.container, ...style }}>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={label}
                value={value}
                onChangeText={onChangeText}
                style={styles.textip}
                autoCorrect={false}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        borderColor: Colors.accent,
        padding: 10,
    },
    textip: {
        flex: 1,
        paddingHorizontal: 21,
        width: 100,
        height: 44,
        borderWidth: 1,
        borderRadius: 24,
        borderColor: Colors.accent,
        backgroundColor: Colors.accent,
        color: '#333',
        fontSize: 16,
        elevation: 4,
    },
});

//make this component available to the app
export default Input;
