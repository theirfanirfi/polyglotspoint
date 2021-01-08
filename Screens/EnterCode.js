import React from 'react'
import {View,Text,TouchableOpacity,TextInput} from 'react-native'
import styles from '../Style/GetStartstyle'

class EnterCode extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                
                <View style={{marginBottom:400}}>
                   
                    <Text style={{color:'white',fontSize: 18,fontWeight: "bold"}} >Enter Code</Text>
                    <TextInput  placeholder='Enter Code' style={styles.ForgotPasswordFormField}/>
                             
                             <View style={{alignItems: 'center',justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.ResetPasswordButton} activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('SetNewPassword')}>
                        
                        
                        <Text style={{fontSize:20,color:'white'}}>Reset Password</Text>
                        
                        </TouchableOpacity>
                        </View>
                </View>
            </View>
        )
    }
}

export default EnterCode

