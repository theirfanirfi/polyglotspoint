import React from 'react';
import styles from '../Style/GetStartstyle'
import {View,Text,TextInput,TouchableOpacity} from 'react-native'

class SetNewPassword extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <View style={{marginBottom:400}}>
                   
                   
                    <TextInput secureTextEntry={true} placeholder='Password' style={styles.ForgotPasswordFormField}/>
                    <TextInput secureTextEntry={true} placeholder='Confirm Password' style={styles.ForgotPasswordFormField}/>
                             
                             <View style={{alignItems: 'center',justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.ResetPasswordButton}  activeOpacity={0.8} >
                        
                        
                        <Text style={{fontSize:20,color:'white'}}>Set Password</Text>
                        
                        </TouchableOpacity>
                        </View>
                </View>
            </View>
        )
    }
}


export default SetNewPassword
 