import 'reflect-metadata';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import RootNavigator from './Screens/Routes'

class App extends React.Component {



    render() {
        return (
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        )

    }


}


export default App;
