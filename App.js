import 'reflect-metadata';
import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
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
import Ad from './Screens/Lessons/Ad'

// import Routes from './Screens/Routes'
import RootNavigator from './Screens/Routes'

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



    render() {
        return (
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        )

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
