import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyADsNz5EM5wbSdaIt2lU_-3cWkiP9JcHFs',
            authDomain: 'authentication-dac91.firebaseapp.com',
            databaseURL: 'https://authentication-dac91.firebaseio.com',
            projectId: 'authentication-dac91',
            storageBucket: 'authentication-dac91.appspot.com',
            messagingSenderId: '340842347689'
        });
    }
    
    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                <LoginForm />
            </View>
        );
    }
}

export default App;
