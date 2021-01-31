import React from 'react'
import { Text, View, TextInput, TouchableOpacity, NativeModules } from 'react-native'
import styles from '../Style/GetStartstyle'
import { post } from '../apis/'
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../redux/AuthContext';
const { signIn } = React.createContext(AuthContext);
class Login extends React.Component {

    state = {
        form_email: "",
        form_password: "",
    }


    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('user', jsonValue)
        } catch (e) {
            // saving error
        }
    }


    initiateLogin = async () => {
        let formdata = new FormData()
        formdata.append("email", this.state.form_email);
        formdata.append("password", this.state.form_password);
        const response = await post('users/login', formdata)
        if (response.isLoggedIn) {

            showMessage({
                message: response.message,
                type: "success",
                position: 'center',
                icon: 'success'
            });

            this.storeData(response.user)
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'auth', screen: 'SelectLanguages' }]
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
            <View style={styles.container} >

                <Text style={styles.LoginTitle}>Login</Text>

                {/* Login Form */}
                <View style={styles.LoginFormContainer}>
                    <TextInput
                        onChangeText={(text) => { this.setState({ form_email: text }) }}
                        placeholder='Email'
                        value={this.state.form_email}
                        style={styles.LoginFormField}
                    />

                    <TextInput
                        onChangeText={(text) => { this.setState({ form_password: text }) }}
                        secureTextEntry
                        placeholder='Password'
                        value={this.state.form_password}
                        style={styles.LoginFormField} />

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.initiateLogin()} style={{
                            borderWidth: 1,
                            borderColor: '#60AA6D',
                            width: '80%',
                            marginTop: 40,
                            borderRadius: 30,
                            padding: 10,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#60AA6D',
                            paddingHorizontal: 13,
                            paddingVertical: 13
                        }} activeOpacity={0.8} >


                            <Text style={{ fontSize: 20, color: 'white' }}>Login</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.AlreadyHaveAnAccoutntBtn} activeOpacity={0.8}>


                            <Text style={styles.getStartedText}
                                onPress={() => this.props.navigation.navigate('Forgot Password')}>Forgot Password</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                {/* End Login Form */}

                <FlashMessage position="top" />

            </View>
        )
    }
}

export default Login