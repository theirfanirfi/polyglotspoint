import 'reflect-metadata';
import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GetStart from './Screens/GetStart'
import Register from './Screens/Register'
import Login from './Screens/Login'
import SelectLanguages from './Screens/SelectLanguages'
import Levels from './Screens/Levels'
import Groups from './Screens/groups'
import BoyImage from './assets/Images/boy.png'
import MainStyle from './Style/MainStyle';
import Account from './Screens/Account'
import Lessons from './Screens/Lessons'
import ForgotPassword from './Screens/ForgotPassword'
import EnterCode from './Screens/EnterCode'
import SetNewPassword from './Screens/SetNewPassowrd'

// import Routes from './Screens/Routes'

const Stack = createStackNavigator();
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
});

function headerRight(navigation) {
    const removeValue = async (navigation) => {
        try {
            await AsyncStorage.removeItem('user')
            // NativeModules.DevSettings.reload()
            navigation.navigate('GetStarted')
        } catch (e) {
            // remove error
        }
    }

    return (

        <View style={{ display: 'flex', flexDirection: 'row' }}>
            {/* <Icon name='heart' size={25} style={{ color: 'red', right: 15 }} /> */}
            {/* <Text style={{ color: 'red', fontWeight: 'bold', right: 7, fontSize: 18 }}>{score}</Text> */}
            <TouchableOpacity style={MainStyle.profile_pic_container} onPress={() => removeValue(navigation)}>
                <Image source={BoyImage} style={MainStyle.profile_pic} />
            </TouchableOpacity>
        </View>
    )
}

class App extends React.Component {
    state = {
        isLoggedIn: false,
        isLoading: true,
    }


    getData = async () => {
        try {
            let value = await AsyncStorage.getItem('user')
            if (value !== null) {
                // this.setState({ isLoggedIn: true, isLoading: false })
                // console.log('login true, loading false')

                return {
                    isLoggedIn: true,
                    isLoading: false,
                }
            } else {
                // this.setState({ isLoading: false })
                // console.log('loading false')
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


    removeValue = async () => {
        try {
            await AsyncStorage.removeItem('user')
            // navigation.navigate('GetStarted')
        } catch (e) {
            // remove error
        }

        console.log('Done.')
    }

    async componentDidMount() {

        setTimeout(async () => {
            let data = await this.getData();
            this.setState({ isLoading: data.isLoading, isLoggedIn: data.isLoggedIn })
        }, 1000);
        // this.removeValue()
    }

    getScreenOptions = (navigation) => {
        if (this.state.isLoggedIn) {
            return (
                {
                    backgroundColor: '#080a09',
                    headerStyle: { backgroundColor: '#080a09' },
                    headerTintColor: '#60AA6D',
                    headerTitleStyle: { color: '#60AA6D' },
                    headerRight: () => headerRight(navigation),
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS

                }
            )
        } else {
            return (
                {
                    headerStyle: { backgroundColor: '#080a09' },
                    headerTintColor: '#60AA6D',
                    headerTitleStyle: { color: '#60AA6D' },
                    headerTitle: 'Back',
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }
            )
        }
    }

    render() {

        if (this.state.isLoading) {
            // We haven't finished checking for the token yet
            return (
                <View style={[styles.container]}>
                    <ActivityIndicator />
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            );
        }

        // if (!this.state.isLoggedIn) {
        const isLoggedIn = this.state.isLoggedIn
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={({ navigation }) => this.getScreenOptions(navigation)}
                    headerMode="float"
                    animation="fade"
                    initialRouteName={!this.state.isLoggedIn ? 'GetStarted' : 'SelectLanguages'}>
                    {/* {!this.state.isLoggedIn ? (
                            <> */}
                    <Stack.Screen name='GetStarted' component={GetStart} options={{ headerShown: false }} />
                    <Stack.Screen name='Register' component={Register} />
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Forgot Password' component={ForgotPassword} />
                    <Stack.Screen name='Enter Code' component={EnterCode} />
                    <Stack.Screen name='SetNewPassword' component={SetNewPassword} />
                    {/* </>
                        ) : (
                                <> */}


                    <Stack.Screen name='SelectLanguages' component={SelectLanguages}
                        options={{ title: 'I Want to Learn...', }} />

                    <Stack.Screen name='Levels' component={Levels} />


                    <Stack.Screen name='Groups' component={Groups} />
                    <Stack.Screen name='Lessons' component={Lessons} />


                    <Stack.Screen name='Account' component={Account} />
                    {/* </>

                            )} */}





                </Stack.Navigator>
            </NavigationContainer>
        )

        //     } else {

        //         return (

        //             <NavigationContainer>
        //                 <Stack.Navigator initialRouteName='SelectLanguages'
        // screenOptions={({ navigation }) => ({
        // backgroundColor: '#080a09',
        // headerStyle: { backgroundColor: '#080a09' },
        // headerTintColor: '#60AA6D',
        // headerTitleStyle: { color: '#60AA6D' },
        // headerRight: () => headerRight(navigation),
        // gestureEnabled: true,
        // gestureDirection: 'horizontal',
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS

        // })}
        //                     headerMode="float"
        //                     animation="fade"
        //                 >
        //                     <Stack.Screen name='GetStarted' component={GetStart} options={{ headerShown: false }} />

        //                     <Stack.Screen name='SelectLanguages' component={SelectLanguages}
        //                         options={{ title: 'I Want to Learn...', }} />

        //                     <Stack.Screen name='Levels' component={Levels} />


        //                     <Stack.Screen name='Groups' component={Groups} />
        //                     <Stack.Screen name='Lessons' component={Lessons} />


        //                     <Stack.Screen name='Account' component={Account} />

        //                 </Stack.Navigator>
        //             </NavigationContainer>
        //         )
        //     }

    }


}


const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};


export default App;
