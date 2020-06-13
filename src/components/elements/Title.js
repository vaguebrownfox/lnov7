//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

// My stuff
import { ListFetch, clearList, removeFromList } from '../../actions/';

//constants
import Colors from '../../constants/Colors';
import TextSizes from '../../constants/TextSizes';

// create a component
const Title = props => {
    const {
        title,
        removeFromList,
        ListFetch,
        currentData,
        // clearList            // purge entire data
    } = props;
    const { key } = currentData;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    //clearList();
                    if (key !== undefined) {
                        removeFromList(JSON.stringify(key));
                    }
                    ListFetch();
                }}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: Colors.secondary,

        borderWidth: 0,
        borderColor: '#fff',
    },
    text: {
        fontSize: TextSizes.title,
        color: Colors.base,
        fontWeight: 'bold',

        ...TextSizes.shadow,
    },
});

const mapStateToProps = state => {
    const { currentData } = state.pnoi;
    return { currentData };
};

//make this component available to the app
export default connect(mapStateToProps, {
    ListFetch,
    clearList,
    removeFromList,
})(Title);
