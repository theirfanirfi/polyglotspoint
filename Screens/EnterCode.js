import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import styles from '../Style/GetStartstyle'
import base64 from 'react-native-base64'
import { post } from '../apis'

class EnterCode extends React.Component {
    state = {
        email: null,
        reset_token: null,
        reset_code: null
    }

    async componentDidMount() {
        let { reset_token, email } = await this.props.route.params
        this.setState({
            email: email,
            reset_token: reset_token
        })
    }

    resetPasswordCode = async () => {
        var form = new FormData();
        let token = await base64.encode(this.state.reset_token);
        form.append("email", this.state.email);
        form.append("code", this.state.reset_code);
        const response = await post('users/confirm_reset_code', form, token)
        if (response.isConfirmed) {
            this.props.navigation.navigate('SetNewPassword', { reset_token: response.reset_token, email: this.state.email })
        } else {
            Alert.alert(response.message)
        }

    }
    render() {
        return (
            <View style={styles.container}>

                <View style={{ marginBottom: 400 }}>

                    <Text style={{ color: 'white', fontSize: 18, fontWeight: "bold" }} >Enter Code</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ reset_code: text })}
                        placeholder='Enter Code'
                        style={styles.ForgotPasswordFormField}
                        value={this.state.reset_code}
                    />

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.ResetPasswordButton} activeOpacity={0.8} onPress={() => this.resetPasswordCode()}>


                            <Text style={{ fontSize: 20, color: 'white' }}>Reset Password</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default EnterCode

