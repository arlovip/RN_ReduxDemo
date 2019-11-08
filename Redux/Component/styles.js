import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    navigationBar: {
        height: 88,
    },
    nameButtonText: {
        height: 50,
        padding: 15,
        backgroundColor: 'black',
        color: 'white',
        alignSelf: 'center',
        borderRadius: 10,
    },
    cell: {
        height: 50,
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'blue',
    },
    line: {
        marginTop: 15,
        backgroundColor: 'green',
        height: 0.5,
    },
});
