import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import styles from '../Style/GetStartstyle'
import { get_withParam, post } from '../apis'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import base64 from 'react-native-base64'


class VerificationCode extends React.Component {
    state = {
        token: null,
        confirmation_code: null
    }

    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('user', jsonValue)
            return true;
        } catch (e) {
            return false;
        }
    }

    async componentDidMount() {
        const { token } = await this.props.route.params
        this.setState({ token: token });
    }
    async confirmAccount() {
        var form = new FormData();
        form.append('code', this.state.confirmation_code);
        let token = await base64.encode(this.state.token);
        let response = await post('users/confirm', form, token)
        console.log(response.isConfirmed)
        if (response.isConfirmed) {
            showMessage({
                message: response.message,
                type: "success",
                position: 'center',
                icon: 'success'
            });


            var isStored = await this.storeData(response.user)
            if (isStored) {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'auth', screen: 'SelectLanguages' }]
                });
            }
        } else {
            showMessage({
                message: response.message,
                type: "danger",
                position: 'center',
                icon: 'danger'
            });
        }
    }

    sendConfirmationCode = async () => {
        let token = await base64.encode(this.state.token);
        let response = await get_withParam('/users/send_confirmation_code', token)
        if (response.isSent) {
            showMessage({
                message: response.message,
                type: "success",
                position: 'center',
                icon: 'success'
            });
        } else {
            showMessage({
                message: response.message,
                type: "danger",
                position: 'center',
                icon: 'danger'
            });
        }

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ marginBottom: 400 }}>

                    <Text style={{ color: 'white', fontSize: 18, fontWeight: "bold" }} >Enter Confirmation Code</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ confirmation_code: text })}
                        placeholder='Enter Confirmation Code'
                        value={this.state.confirmation_code}
                        style={styles.ForgotPasswordFormField} />

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.ResetPasswordButton} activeOpacity={0.8} onPress={() => this.confirmAccount()}>


                            <Text style={{ fontSize: 20, color: 'white' }}>Confirm Account</Text>

                        </TouchableOpacity>
                    </View>


                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.ResetPasswordButton} activeOpacity={0.8} onPress={() => this.sendConfirmationCode()}>


                            <Text style={{ fontSize: 20, color: 'white' }}>Re-send Confirm Code</Text>

                        </TouchableOpacity>
                    </View>
                </View>
                <FlashMessage position="top" />

            </View>
        )
    }
}

export default VerificationCode

