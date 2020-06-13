//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

//My stuff
import { ListFetch, search } from '../actions/';

import BleSearchButton from './elements/BleSearchButton';
import Title from './elements/Title';
import ListAddButton from './elements/ListAddButton';
import List from './elements/List';
import Search from './Search';

//costants
import Colors from '../constants/Colors';

class Brelungrecs extends Component {
    componentDidMount() {
        this.props.ListFetch();
        console.log('bre mount');
    }
    render() {
        const { searchMode, search } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <BleSearchButton />

                    <Title title="Lno " />

                    <ListAddButton />
                </View>

                <List />

                <Modal
                    animationType="fade"
                    visible={searchMode}
                    transparent={true}
                    onRequestClose={() => {
                        search(false);
                    }}>
                    <Search />
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: Colors.primary,
    },
    header: {
        flexDirection: 'row',
        height: 70,
        elevation: 2,

        borderWidth: 0,
        borderColor: Colors.rec,
    },
});

const mapStateToProps = state => {
    const { searchMode } = state.ble;
    return { searchMode };
};

export default connect(mapStateToProps, { ListFetch, search })(Brelungrecs);
