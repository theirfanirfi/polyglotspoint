import 'reflect-metadata';
import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';


import Icon from 'react-native-vector-icons/FontAwesome'
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

let score = 1



function headerRight(navigation) {
    return (

        <View style={{ display: 'flex', flexDirection: 'row' }}>
            {/* <Icon name='heart' size={25} style={{ color: 'red', right: 15 }} /> */}
            {/* <Text style={{ color: 'red', fontWeight: 'bold', right: 7, fontSize: 18 }}>{score}</Text> */}
            <TouchableOpacity style={MainStyle.profile_pic_container} onPress={() => navigation.navigate('Account')}>
                <Image source={BoyImage} style={MainStyle.profile_pic} />
            </TouchableOpacity>
        </View>
    )
}
class App extends React.Component {
    state = {
        isLoggedIn: false,

    }



    render() {





        if (this.state.isLoggedIn) {

            return (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: { backgroundColor: '#080a09' },
                            headerTintColor: '#60AA6D',
                            headerTitleStyle: { color: '#60AA6D' },
                            headerTitle: 'Back',
                            gestureEnabled: true,
                            gestureDirection: 'horizontal',
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                        }}
                        headerMode="float"
                        animation="fade"
                        initialRouteName='Get Started'>
                        <Stack.Screen name='Get Started' component={GetStart} options={{ headerShown: false }} />
                        <Stack.Screen name='Register' component={Register} />
                        <Stack.Screen name='Login' component={Login} />
                        <Stack.Screen name='Forgot Password' component={ForgotPassword} />
                        <Stack.Screen name='Enter Code' component={EnterCode} />
                        <Stack.Screen name='SetNewPassword' component={SetNewPassword} />

                    </Stack.Navigator>
                </NavigationContainer>
            )

        } else {

            return (

                <NavigationContainer>
                    <Stack.Navigator initialRouteName='SelectLanguages'
                        screenOptions={({ navigation }) => ({
                            backgroundColor: '#080a09',
                            headerStyle: { backgroundColor: '#080a09' },
                            headerTintColor: '#60AA6D',
                            headerTitleStyle: { color: '#60AA6D' },
                            headerRight: () => headerRight(navigation),
                            gestureEnabled: true,
                            gestureDirection: 'horizontal',
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS

                        })}
                        headerMode="float"
                        animation="fade"
                    >
                        <Stack.Screen name='SelectLanguages' component={SelectLanguages}
                            options={{ title: 'I Want to Learn...', }} />

                        <Stack.Screen name='Levels' component={Levels} />


                        <Stack.Screen name='Groups' component={Groups} />
                        <Stack.Screen name='Lessons' component={Lessons} />


                        <Stack.Screen name='Account' component={Account} />

                    </Stack.Navigator>
                </NavigationContainer>
            )
        }

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
