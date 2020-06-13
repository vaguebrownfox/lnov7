//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

// My stuff
import {
    getFormDetails,
    resetForm,
    storeDetails,
    logMetaData,
} from '../actions/';

import Input from './elements/Input';
import Title from './elements/Title';

// constants
import RoundedText from '../constants/RoundedText';
import Colors from '../constants/Colors';

// create a component
class Form extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Title title="Form" />
                </View>

                <ScrollView>
                    <View style={styles.field}>
                        <View style={styles.input}>
                            <Input inputType={this.Name()} />
                        </View>

                        <View style={styles.subinput}>
                            <Input inputType={this.Age()} />
                            <Input inputType={this.Gender()} />
                        </View>

                        <View style={styles.subinput}>
                            <Input inputType={this.Height()} />
                            <Input inputType={this.Weight()} />
                        </View>

                        <View style={styles.subinput}>
                            <TouchableOpacity
                                onPress={() => this.cancelHandler()}>
                                <RoundedText
                                    text="Cancel"
                                    textSize={16}
                                    style={{
                                        ...styles.buttonStyle,
                                        borderColor: Colors.rec,
                                        backgroundColor: null,
                                    }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.addHandler()}>
                                <RoundedText
                                    text="Add"
                                    textSize={16}
                                    style={{
                                        ...styles.buttonStyle,
                                        borderColor: Colors.crumbs,
                                        backgroundColor: null,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    Name() {
        return {
            label: 'Name',
            value: this.props.name,
            onChangeText: text => {
                this.props.getFormDetails({ prop: 'name', value: text });
            },
        };
    }
    Age() {
        return {
            label: 'Age',
            value: this.props.age,
            onChangeText: text => {
                this.props.getFormDetails({ prop: 'age', value: text });
            },
            style: { width: 150 },
        };
    }

    Gender() {
        return {
            label: 'Gender',
            value: this.props.gender,
            onChangeText: text => {
                this.props.getFormDetails({ prop: 'gender', value: text });
            },
            style: { width: 150 },
        };
    }
    Height() {
        return {
            label: 'Height (cm)',
            value: this.props.height,
            onChangeText: text => {
                this.props.getFormDetails({ prop: 'height', value: text });
            },
            style: { width: 150 },
        };
    }

    Weight() {
        return {
            label: 'Weight (kg)',
            value: this.props.weight,
            onChangeText: text => {
                this.props.getFormDetails({ prop: 'weight', value: text });
            },
            style: { width: 150 },
        };
    }

    cancelHandler = () => {
        this.props.resetForm();
        Actions.brelungrecs({ type: 'reset' });
    };
    addHandler = () => {
        const {
            name,
            age,
            gender,
            height,
            weight,
            logMetaData,
            connected,
        } = this.props;
        if ([name, age, gender, height, weight].some(data => data === '')) {
            return;
        } else {
            this.props.storeDetails({ name, age, gender, height, weight });
            const metaData = `${name},${age},${gender},${height},${weight}`;
            logMetaData({ connected, metaData });
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: Colors.primary,
    },
    title: {
        flexDirection: 'row',
        height: 70,
        elevation: 2,
    },
    field: {
        paddingHorizontal: 10,
    },
    input: {
        paddingVertical: 15,
        alignItems: 'stretch',
    },
    subinput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonStyle: {
        alignSelf: 'center',
        width: 100,
        height: 40,
        borderWidth: 1,
        borderRadius: 30,
        paddingBottom: 2,
        paddingRight: 3,
        elevation: 2,
        margin: 20,
    },
});

const mapStateToProps = state => {
    const { connected } = state.ble;
    const { name, age, gender, height, weight } = state.form;
    return { name, age, gender, height, weight, connected };
};

//make this component available to the app
export default connect(mapStateToProps, {
    getFormDetails,
    resetForm,
    storeDetails,
    logMetaData,
})(Form);
