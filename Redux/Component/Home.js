import React, {Component} from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native';
import {connect} from 'react-redux';
import {addName} from '../Action/NameAction';
import styles from "./styles";

const buttonText = 'Add Name';
let index = 0;

class Home extends Component {

    _addName = () => {
        index += 1;
        const data = [{title: `test${index}`}];
        this.props.addName(data);
    };

    _renderItem = ({item}) => {
        const {title} = item;
        return (<View style={styles.cell}>
            <Text>{title}</Text>
        </View>);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}/>
                <TouchableOpacity onPress={this._addName}>
                    <Text style={styles.nameButtonText}>{buttonText}</Text>
                </TouchableOpacity>
                <View style={styles.line}/>
                <FlatList
                    renderItem={this._renderItem}
                    data={this.props.data}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

}

const mapStateToProps = state => ({
    data: state.nameReducer.data,
});

const mapDispatchToProps = dispatch => ({
    addName: data => dispatch(addName(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
