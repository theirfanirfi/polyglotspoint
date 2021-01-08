import React from 'react'
import {StyleSheet} from 'react-native'

export default  styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080a09',
        alignItems: 'center',
        justifyContent: 'center',
        
    
      },
      getStartedText:{
        color:'white',
        fontSize: 18,
        
        fontWeight: "bold",
        padding:18,
        alignSelf: "center",
        
      },

      getStartedButton:{
        
        borderWidth:1,
        borderColor:'#60AA6D',
        width:'90%',
        marginTop:120,
        borderRadius:30,
        padding:10,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#60AA6D',
       
        
        

      },

      AlreadyHaveAnAccoutntBtn: {
      marginTop:20
      },

      getStartedAppTitle:{
      marginBottom:50,
      fontSize:50,
      fontFamily:'cursive',
      fontWeight:'bold',
      color:'#60AA6D'
      },

      RegistrationFormTextField:{
       
        width:300,
        marginTop:20,
        fontSize:15,
        color:'white',
        borderRadius:4,
        
        padding:12,
        height:50,
        backgroundColor:'#36413d',
        borderBottomStartRadius:120,
        color:'white',
        
        


      },
      RegistrationFormContainer:{
       marginTop:20,
       marginBottom:50
      },

      RegisterTitle:{
      
      fontSize:50,
      fontFamily:'cursive',
      fontWeight:'bold',
      color:'#60AA6D',
      marginTop:20
      
      },
      LoginTitle:{
        fontSize:40,
        fontFamily:'cursive',
        fontWeight:'bold',
        color:'#60AA6D',
        marginTop:125
      },

      LoginFormContainer:{
        marginBottom:170
      },
      LoginFormField:{
        borderWidth:1,
        borderColor:'#36413d',
        width:280,
        marginTop:35,
        fontSize:15,
        color:'white',
        borderRadius:4,
        fontWeight:'bold',
        padding:10,
        height:45,
        backgroundColor:'#36413d',
        color:'white',
      },
      pickProfilepic:{
        width:100,
        height:100,
        borderRadius:100
      },
      ForgotPasswordFormField:{
        borderWidth:1,
        borderColor:'#36413d',
        width:280,
        marginTop:20,
        fontSize:15,
        color:'white',
        borderRadius:4,
        fontWeight:'bold',
        padding:10,
        height:45,
        backgroundColor:'#36413d',
        color:'white',
      },
      ResetPasswordButton: {
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
      }
           
})
