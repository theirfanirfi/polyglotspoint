import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'

import styles from '../Style/GetStartstyle'


class GetStart extends React.Component{
    render() {
        return (
            <View style={styles.container}>
              

               <Text style={styles.getStartedAppTitle}>Poly Glots Point</Text>
              
                <TouchableOpacity style={styles.getStartedButton} activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('Register')}>
                 
                 
                 <Text style={styles.getStartedText}>Get Started</Text>
                
                </TouchableOpacity>

                <TouchableOpacity style={styles.AlreadyHaveAnAccoutntBtn} activeOpacity={0.8}>


                 <Text style={styles.getStartedText} onPress={()=>this.props.navigation.navigate('Login')}>Already Have An Account</Text>
                </TouchableOpacity>
               
            </View>
        )
    }
}

export default GetStart