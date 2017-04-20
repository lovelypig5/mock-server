import React from 'react';
import {
    AppRegistry
} from 'react-native';
import Router from './router';

class App extends React.Component {

    render() {
        return (
            <Router />
        );
    }

}

AppRegistry.registerComponent('mobile', () => App);
