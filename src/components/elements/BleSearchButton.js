//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// My stuff
import { search } from '../../actions/';
//constants
import Colors from '../../constants/Colors';

// create a component
class BleSearchButton extends Component {
    render() {
        const { connected } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.search(true);
                    }}>
                    <View
                        style={{
                            ...styles.blu,
                            backgroundColor:
                                connected.id === '0'
                                    ? Colors.rec
                                    : Colors.bleon,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.secondary,

        borderWidth: 0,
        borderColor: Colors.rec,
    },
    blu: {
        flex: 1,
        backgroundColor: Colors.rec,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        width: 25,

        borderRightWidth: 0,
        borderColor: '#56f',
    },
});

const mapStateToProps = state => {
    const { connected } = state.ble;
    return { connected };
};

//make this component available to the app
export default connect(mapStateToProps, { search })(BleSearchButton);
