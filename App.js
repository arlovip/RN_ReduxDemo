import React, {Component} from 'react';
import Home from "./Redux/Component/Home";
import {Provider} from 'react-redux';
import Store from './Redux/Store/Store';

export default class App extends Component {

    render() {
        return (
            <Provider store={Store}>
                <Home/>
            </Provider>
        );
    }
}
