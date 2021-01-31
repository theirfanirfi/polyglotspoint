import 'reflect-metadata';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// import Routes from './Screens/Routes'
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
