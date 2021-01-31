import React from 'react';
import styles from '../Style/GetStartstyle'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import base64 from 'react-native-base64'
import { post } from '../apis/index'


class SetNewPassword extends React.Component {
    state = {
        email: null,
        reset_token: null,
        new_password: null,
        confirm_password: null,
    }

    async componentDidMount() {
        let { reset_token, email } = await this.props.route.params
        console.log(reset_token)
        console.log(email)
        this.setState({
            email: email,
            reset_token: reset_token
        })
    }

    resetPassword = async () => {
        if (this.state.confirm_password !== this.state.new_password) {
            Alert.alert('Password did not match')
        } else {

            var form = new FormData();
            form.append("email", this.state.email)
            form.append("password", this.state.new_password)
            let token = await base64.encode(this.state.reset_token);
            const response = await post('users/reset_password', form, token)
            if (response.isReset) {
                Alert.alert(response.message)

                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'notloggedin', screen: 'Login' }]
                });
            } else {
                Alert.alert(response.message)
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginBottom: 400 }}>


                    <TextInput secureTextEntry={true}
                        value={this.state.new_password}
                        onChangeText={(text) => this.setState({ new_password: text })}
                        placeholder='Password'
                        style={styles.ForgotPasswordFormField}
                    />
                    <TextInput secureTextEntry={true}
                        value={this.state.confirm_password}
                        onChangeText={(text) => this.setState({ confirm_password: text })}
                        placeholder='Confirm Password'
                        style={styles.ForgotPasswordFormField}
                    />

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.resetPassword()} style={styles.ResetPasswordButton} activeOpacity={0.8} >


                            <Text style={{ fontSize: 20, color: 'white' }}>Set Password</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


export default SetNewPassword
