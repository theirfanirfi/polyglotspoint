import React from 'react'
import {View,Text, TouchableOpacity, Image} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


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


const Stack = createStackNavigator();

let score = 1



 function headerRight(navigation){
    return(
       
        <View style={{display:'flex',flexDirection:'row'}}> 
                  <Icon name='heart' size={25} style={{color:'red',right:15}}/> 
                  <Text style={{color:'red',fontWeight:'bold',right:7,fontSize:18}}>{score}</Text>
                  <TouchableOpacity style={MainStyle.profile_pic_container} onPress={()=>navigation.navigate('Account')}>
                  <Image source={BoyImage} style={MainStyle.profile_pic}/>
                  </TouchableOpacity>
                  </View>
    )
}

class Routes extends SelectLanguages {

    
    state = {
        isLoggedIn:false,
        
    }

      

    render() {
    
        
       


    if(this.state.isLoggedIn){

        return (
            <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{ headerStyle: { backgroundColor: '#080a09' },
            headerTintColor:'#60AA6D',
            headerTitleStyle:{color:'#60AA6D'}, 
            headerTitle:'Back' }}
            initialRouteName='Get Started'>
                <Stack.Screen name='Get Started' component={GetStart} options={{headerShown:false}}/>
                <Stack.Screen name='Register' component={Register} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Forgot Password' component={ForgotPassword} />
                <Stack.Screen name='Enter Code' component={EnterCode} />
                <Stack.Screen name='SetNewPassword' component={SetNewPassword} />
                
            </Stack.Navigator>
            </NavigationContainer>
        )

    }else{
        
        return(
            
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Select Languages'
            screenOptions={({ navigation }) => ({ 
                backgroundColor: '#080a09',
                headerStyle: { backgroundColor: '#080a09' },
            headerTintColor:'#60AA6D',
            headerTitleStyle:{color:'#60AA6D'},
            headerRight: () => headerRight(navigation)
        })}
            >
                <Stack.Screen name='Select Languages' component={SelectLanguages} options={{ title:'I Want to Learn...'}}/>

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

export default Routes