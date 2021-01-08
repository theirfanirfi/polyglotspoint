import React from 'react' 
import { Text, View,TextInput,TouchableOpacity,Keyboard } from 'react-native'
import styles from '../Style/GetStartstyle'

class Login extends React.Component {
    render() {
        return(
            <View style={styles.container} >
                
         <Text style={styles.LoginTitle}>Login</Text>

        {/* Login Form */}
        <View style={styles.LoginFormContainer}>

        
        <TextInput  placeholder='Email' style={styles.LoginFormField}/>

        <TextInput secureTextEntry placeholder='Password' style={styles.LoginFormField}/>

        <View style={{alignItems: 'center',justifyContent: 'center'}}>
            <TouchableOpacity style={{
                borderWidth:1,
                borderColor:'#60AA6D',
                width:'80%',
                marginTop:40,
                borderRadius:30,
                padding:10,
                height:40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:'#60AA6D',
                paddingHorizontal:13,
                paddingVertical:13
            }} activeOpacity={0.8} >
                 
                 
                 <Text style={{fontSize:20,color:'white'}}>Login</Text>
                
                </TouchableOpacity>

                <TouchableOpacity style={styles.AlreadyHaveAnAccoutntBtn} activeOpacity={0.8}>


                 <Text style={styles.getStartedText} onPress={()=>this.props.navigation.navigate('Forgot Password')}>Forgot Password</Text>
                </TouchableOpacity>

                </View>
        </View>
        {/* End Login Form */}
            </View>
        )
    }
}

export default Login