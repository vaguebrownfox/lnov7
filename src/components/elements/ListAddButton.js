import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';

// constants
import Colors from '../../constants/Colors';
import TextSizes from '../../constants/TextSizes';

const ListAddButton = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    Actions.form();
                }}>
                <View style={styles.add} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: Colors.secondary,
    },
    add: {
        flex: 1,
        backgroundColor: Colors.crumbs,
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        width: 25,

        borderLeftWidth: 0,
        borderColor: '#cfd',
    },
});

export default ListAddButton;
