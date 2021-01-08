import React from 'react';
import styles from '../Style/GetStartstyle'
import {View,Text,TextInput,TouchableOpacity} from 'react-native'

class ForgotPassword extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <View style={{marginBottom:400}}>
                    <Text style={[styles.LoginTitle,{marginBottom:20}]}>Forgot Password</Text>
                    <Text style={{color:'white',fontSize: 18,fontWeight: "bold"}} >Enter Your Email</Text>
                    <TextInput  placeholder='Email' style={styles.ForgotPasswordFormField}/>
                             
                             <View style={{alignItems: 'center',justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.ResetPasswordButton} onPress={()=>this.props.navigation.navigate('Enter Code')} activeOpacity={0.8} >
                        
                        
                        <Text style={{fontSize:20,color:'white'}}>Send Password</Text>
                        
                        </TouchableOpacity>
                        </View>
                </View>
            </View>
        )
    }
}


export default ForgotPassword
 
