import React, { Component } from 'react';
import { Text, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import { Button, Card, CardSection, Input } from './common';

class LoginForm extends Component {
    state = { 
        email: '',
        password: '',
    };

    onButtonPress() {
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                ToastAndroid.show('Sign in Success', ToastAndroid.SHORT);
                this.setState({ error: '' });
            })
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        ToastAndroid.show('Sign up Success', ToastAndroid.SHORT);
                        this.setState({ error: ''});
                    })
                    .catch(() => {
                        this.setState({ error: 'Authentication Failed.' });
                    });
            });
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@email.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="****"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Log in
                    </Button>
                </CardSection>
                        <LoginButton
                            publishPermissions={["publish_actions"]}
                            onLoginFinished={
                                (error, result) => {
                                    if (error) {
                                        alert("login has error: " + result.error);
                                    } else if (result.isCancelled) {
                                        alert("login is cancelled.");
                                    } else {
                                        AccessToken.getCurrentAccessToken().then(
                                            (data) => {
                                                alert(data.accessToken.toString())
                                            }
                                        )
                                    }
                                }
                            }
                            onLogoutFinished={() => alert("logout.")}/>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    },
    fbStyle: {
        alignSelf: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
};

export default LoginForm;
