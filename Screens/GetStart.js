import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

import styles from '../Style/GetStartstyle'
import AsyncStorage from '@react-native-async-storage/async-storage';


class GetStart extends React.Component {
    state = {
        isLoggedIn: false,
        isLoading: true
    }
    getData = async () => {
        try {
            let value = await AsyncStorage.getItem('user')
            if (value !== null) {

                return {
                    isLoggedIn: true,
                    isLoading: false,
                }
            } else {
                return {
                    isLoggedIn: false,
                    isLoading: false,
                }
            }
        } catch (e) {
            return {
                isLoggedIn: false,
                isLoading: false,
            }

        }
    }

    async componentDidMount() {
        setTimeout(async () => {
            let data = await this.getData();
            this.setState({ isLoading: data.isLoading, isLoggedIn: data.isLoggedIn }, () => {
                if (this.state.isLoggedIn) {
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'auth', screen: 'SelectLanguages' }]
                    });
                }
            })

        }, 2000);
    }

    render() {

        return (
            <View style={styles.container}>



                <Text style={styles.getStartedAppTitle}>PolyGlots Point</Text>

                {this.state.isLoading ? (
                    <>
                        <ActivityIndicator style={{ alignSelf: 'center' }} size="large" color="#60AA6D" />
                        <Text style={{ color: 'white', alignSelf: 'center' }}>Checking status...</Text>
                    </>
                ) : (
                        <>
                            <TouchableOpacity style={styles.getStartedButton} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Register')}>


                                <Text style={styles.getStartedText}>Get Started</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={styles.AlreadyHaveAnAccoutntBtn} activeOpacity={0.8}>


                                <Text style={styles.getStartedText} onPress={() => this.props.navigation.navigate('Login')}>Already Have An Account</Text>
                            </TouchableOpacity>
                        </>
                    )
                }

            </View>
        )
    }
}

export default GetStart