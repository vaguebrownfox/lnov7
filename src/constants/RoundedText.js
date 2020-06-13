import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from './Colors';

const RoundedText = props => {
    return (
        <View
            style={{
                ...styles.main,
                ...props.style,
            }}>
            <Text
                style={{
                    fontSize: props.textSize,
                    fontWeight: '900',
                    color: '#ddd',
                    textShadowColor: 'rgba(0, 0, 0, 0.25)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 10,
                }}>
                {props.text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        borderRadius: 30,
        backgroundColor: Colors.base,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        borderWidth: 0,
        borderColor: Colors.accent,
    },
});

export default RoundedText;
