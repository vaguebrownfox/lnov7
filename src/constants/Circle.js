import React from 'react';
import { View } from 'react-native';
import Colors from './Colors';

const Circle = props => {
    return (
        <View
            style={{
                ...{
                    width: props.dia,
                    height: props.dia,
                    margin: 7,
                    borderRadius: props.sq ? 5 : props.dia / 2,
                    backgroundColor: Colors.circle,
                    position: 'relative',
                    elevation: 10,
                    borderWidth: 0,
                    borderColor: Colors.bleoff,
                },
                ...props.style,
            }}
        />
    );
};
export default Circle;
