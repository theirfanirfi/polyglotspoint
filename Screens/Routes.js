import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';


import Icon from 'react-native-vector-icons/FontAwesome'
import GetStart from './GetStart'

import Register from './Register'
import Login from './Login'
import SelectLanguages from './SelectLanguages'
import Levels from './Levels'
import Groups from './groups'
import BoyImage from '../assets/Images/boy.png'
import MainStyle from '../Style/MainStyle';
import Account from './Account'
import Lessons from './Lessons'
import ForgotPassword from './ForgotPassword'
import EnterCode from './EnterCode'
import SetNewPassword from './SetNewPassowrd'
import AsyncStorage from '@react-native-async-storage/async-storage';


function headerRight(navigation) {
    let score = 1

    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('user')
            navigation.reset({
                index: 0,
                routes: [{ name: 'notloggedin', screen: 'GetStarted' }]
            });
        } catch (e) {
            // remove error
        }
    }
    return (

        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Icon name='heart' size={25} style={{ color: 'red', right: 15 }} />
            <Text style={{ color: 'red', fontWeight: 'bold', right: 7, fontSize: 18 }}>{score}</Text>
            <TouchableOpacity style={MainStyle.profile_pic_container} onPress={() => removeValue()}>
                <Image source={BoyImage} style={MainStyle.profile_pic} />
            </TouchableOpacity>
        </View>
    )
}

getLoggedInScreenOptions = (navigation) => {
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
}


const Stack = createStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName="base" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="base" component={BaseNavigator} />
        </Stack.Navigator>
    )
}



function BaseNavigator() {
    return (
        <Stack.Navigator initialRouteName="notloggedin" detachInactiveScreens={true} screenOptions={{ headerShown: false }}>
            <Stack.Screen name='auth' component={authNavigator} />

            <Stack.Screen name='notloggedin' component={notLoggedInNavigator} />
        </Stack.Navigator>
    )
}


function authNavigator() {
    return (
        <Stack.Navigator initialRouteName=""
            screenOptions={({ navigation }) => getLoggedInScreenOptions(navigation)}
        >
            <Stack.Screen name='SelectLanguages' component={SelectLanguages} options={{ title: 'I Want to Learn...' }} />

            <Stack.Screen name='Levels' component={Levels} />


            <Stack.Screen name='Groups' component={Groups} />
            <Stack.Screen name='Lessons' component={Lessons} />


            <Stack.Screen name='Account' component={Account} />
        </Stack.Navigator>
    )
}



function notLoggedInNavigator() {
    return (
        <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
            <Stack.Screen name='GetStarted' component={GetStart} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Forgot Password' component={ForgotPassword} />
            <Stack.Screen name='Enter Code' component={EnterCode} />
            <Stack.Screen name='SetNewPassword' component={SetNewPassword} />
        </Stack.Navigator>
    )
}

// export default function Routes() {
//     return (
//         <NavigationContainer>
//             <RootNavigator />
//         </NavigationContainer>
//     )
// }