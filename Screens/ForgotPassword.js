import React from 'react';
import styles from '../Style/GetStartstyle'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { post } from '../apis';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

class ForgotPassword extends React.Component {
    state = {
        email: null,
    }

    sendResetPasswordCode = async () => {
        var form = new FormData()
        form.append('email', this.state.email)
        let response = await post('users/send_password_reset_code', form, 'notoken')
        if (response.isSent) {
            console.log(response.reset_token)
            showMessage({
                message: "Code Sent",
                type: "success",
                position: 'center',
                icon: 'success'
            });

            this.props.navigation.navigate('EnterCode', { reset_token: response.reset_token, email: this.state.email })
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
                    <Text style={[styles.LoginTitle, { marginBottom: 20 }]}>Forgot Password</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: "bold" }} >Enter Your Email</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ email: text })}
                        placeholder='Email'
                        style={styles.ForgotPasswordFormField} />

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.ResetPasswordButton} onPress={() => this.sendResetPasswordCode()} activeOpacity={0.8} >


                            <Text style={{ fontSize: 20, color: 'white' }}>Reset Password</Text>

                        </TouchableOpacity>
                    </View>
                </View>
                <FlashMessage position="center" />

            </View>
        )
    }
}


export default ForgotPassword

