import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

// My stuff
import { ListFetch } from '../../actions/';

// constants
import Colors from '../../constants/Colors';
import TextSizes from '../../constants/TextSizes';
import Circle from '../../constants/Circle';

class List extends Component {
    componentDidMount() {
        this.props.ListFetch();
    }
    renderElement(item) {
        const circleDia = 45;
        const id = JSON.parse(item); // id = {name: , timeStamp: }
        return (
            <View style={styles.element}>
                <Circle dia={circleDia} />

                <View style={styles.nameView}>
                    <Text style={styles.name}>{id.name}</Text>
                </View>

                <TouchableWithoutFeedback
                    onPress={() => Actions.cpnoi({ asyncKey: item, id })}>
                    <View style={styles.nameSelect}>
                        <View style={styles.nameSelectC} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={item => item}
                    data={this.props.list}
                    renderItem={({ item }) => this.renderElement(item)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: Colors.primary,

        borderWidth: 0,
        borderColor: '#fff',
    },
    element: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 65,
        marginTop: 10,
        marginHorizontal: 4,
        paddingLeft: 5,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: Colors.secondary,

        borderWidth: 0,
        borderColor: '#fff',
    },
    nameView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignSelf: 'stretch',
        alignItems: 'center',

        borderWidth: 0,
        borderColor: '#fff',
    },
    name: {
        fontSize: TextSizes.cardTitle,
        color: Colors.accent,
    },
    nameSelect: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 100,
        backgroundColor: Colors.prof,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,

        borderWidth: 0,
        borderColor: '#fff',
    },
    nameSelectC: {
        flex: 1,
        width: '70%',
        backgroundColor: Colors.secondary,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,

        borderWidth: 0,
        borderColor: '#fff',
    },
});

const mapStateToProps = state => {
    const { list } = state.form;
    return { list };
};

export default connect(mapStateToProps, { ListFetch })(List);
