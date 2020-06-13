//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';

// My stuff
import { search, startBleScan, refreshBle, connectBle } from '../actions/';

// constants
import Colors from '../constants/Colors';
import TextSizes from '../constants/TextSizes';

class Search extends Component {
    componentDidMount() {
        if (this.props.connected.id === '0') {
            this.props.startBleScan();
        }
        console.log(
            'devs: ',
            this.props.bleList.map(d => d.localName),
        );
    }

    renderDevices(device) {
        const { connectBle, connected } = this.props;
        return (
            <TouchableOpacity onPress={() => connectBle(device)}>
                <View style={styles.cardSec}>
                    <Text
                        style={{
                            ...styles.secText,
                            color:
                                device.id === connected.id
                                    ? Colors.bleon
                                    : Colors.accent,
                        }}>
                        {device.localName}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { refreshBle, startBleScan, bleList, search } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.head}>
                        <TouchableOpacity
                            onPress={() => {
                                refreshBle();
                                startBleScan();
                            }}>
                            <Text style={styles.textHead}>Search</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        keyExtractor={item => item.id}
                        data={bleList}
                        renderItem={({ item }) => this.renderDevices(item)}
                    />
                </View>
                <TouchableOpacity onPress={() => search(false)}>
                    <View style={styles.cancel} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.glass,
    },
    card: {
        width: 280,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: Colors.secondary,
        borderRadius: 17,
        elevation: 4,
    },
    head: {
        padding: 9,
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 0,
        borderColor: Colors.rec,
    },
    textHead: {
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: TextSizes.cardTitle + 2,
        color: Colors.base,

        //...TextSizes.shadow,
    },
    cardSec: {
        flex: 1,
        margin: 3,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 0,
        borderColor: Colors.rec,
    },
    secText: {
        color: Colors.accent,
        fontSize: TextSizes.cardSection,
    },
    cancel: {
        margin: 7,
        width: 100,
        height: 3,
        borderRadius: 2,
        backgroundColor: Colors.rec,
    },
});

const mapStateToProps = state => {
    return {
        bleList: state.ble.bleList,
        connected: state.ble.connected,
    };
};

export default connect(mapStateToProps, {
    search,
    startBleScan,
    refreshBle,
    connectBle,
})(Search);
