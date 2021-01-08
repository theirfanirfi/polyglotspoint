import React from 'react'
import styles from '../Style/GetStartstyle'
import {View,Text,Image,TextInput,TouchableOpacity,ScrollView, Button} from 'react-native'

import RBSheet from "react-native-raw-bottom-sheet";

import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker';

class Register extends React.Component {
  state ={
      country:'',
      items:[]
  }
   
  async componentDidMount(){
    let  items  = []
   for (let i = 1; i <=100; i++) {
      let  e = {'label': i.toString(), 'value': i}
      items.push(e)
     }
     
     this.setState({items:items})

  }
           
 
    render(){

        

        return(
            
            <View style={styles.container}>
             
           

             <ScrollView showsVerticalScrollIndicator={false}>
             
              {/* RegisterationForm */}
                   
             
              <View style={{justifyContent:'center',alignItems: 'center'}}>
              <Text style={styles.RegisterTitle}>Register</Text>


              <TouchableOpacity onPress={() => this.RBSheet.open()} style={{borderColor:'#36413d',backgroundColor:'#36413d',borderRadius:100,justifyContent:'center',alignItems: 'center',width:70,height:70,marginTop:20}}>
              <Icon name='user' color='white' size={50} />
              </TouchableOpacity>
              
              </View>

              

            <View style={styles.RegistrationFormContainer}>
              
            
              

            <TextInput placeholder='Full Name' style={styles.RegistrationFormTextField} placeholderTextColor="white" />

            <TextInput  placeholder='Email' style={styles.RegistrationFormTextField} placeholderTextColor="white" />

            <TextInput secureTextEntry placeholder='Password' style={styles.RegistrationFormTextField} placeholderTextColor="white" />

        {/* Gender */}
        <View style={{marginTop:20}}>
            <DropDownPicker
                items={[
                    {label: 'Female', value: 'Female', },
                    {label: 'Male', value: 'Male',},
                    
                   
                ]}
               placeholder='Gender'
               placeholderStyle={{color:'white'}}
                containerStyle={{height: 50,}}
                style={{backgroundColor: '#36413d',borderColor:'#36413d'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#36413d'}}
            
            />
            </View>
        {/* End Gender */}

           {/* Continents */}
           <View style={{marginTop:20}}>
            <DropDownPicker
                items={[
                    {label: 'Europe', value: 'Europe', icon: () => <Icon name="flag" size={18} color='#60AA6D'/>, hidden: true},
                    {label: 'Asia', value: 'Asia', icon: () => <Icon name="flag" size={18} color='#60AA6D' />},
                    {label: 'North America', value: 'North America', icon: () => <Icon name="flag" size={18} color='#60AA6D' />},
                    {label: 'South', value: 'South', icon: () => <Icon name="flag" size={18} color='#60AA6D' />},
                    {label: 'Africa', value: 'Africa', icon: () => <Icon name="flag" size={18} color='#60AA6D' />},
                   
                    
                    
                ]}
               placeholder='Select Your Continent'
               placeholderStyle={{color:'white'}}
                containerStyle={{height: 50,}}
                style={{backgroundColor: '#36413d',borderColor:'#36413d'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#36413d'}}
            
            />
            </View>
        {/* End Continents */}



    {/* Country */}
 
                
                
    <View style={{marginTop:20}}>
                <DropDownPicker
                items={[
                    {label: 'USA', value: 'USA', icon: () => <Icon name="flag" size={18} color='#60AA6D'/>, hidden: true},
                    {label: 'UK', value: 'UK', icon: () => <Icon name="flag" size={18} color='#60AA6D' />},
                    {label: 'France', value: 'France', icon: () => <Icon name="flag" size={18} color='#60AA6D' />},
                    {label: 'India', value: 'India', icon: () => <Icon name="flag" size={18} color='#60AA6D' />},
                    {label: 'Pakistan', value: 'Pakistan', icon: () => <Icon name="flag" size={18} color='#60AA6D' />},
                    {label: 'Indonesia', value: 'Indonesia', icon: () => <Icon name="flag" size={18} color='#60AA6D' />},
                    {label: 'Russia', value: 'Russia', icon: () => <Icon name="flag" size={18} color='#60AA6D' />},
                    {label: 'China', value: 'China', icon: () => <Icon name="flag" size={18} color='#60AA6D' />},
                    {label: 'Turkey', value: 'Turkey', icon: () => <Icon name="flag" size={18} color='#60AA6D' />},
                ]}
               placeholder='Select Your Country'
               placeholderStyle={{color:'white'}}
                containerStyle={{height: 50,}}
                style={{backgroundColor: '#36413d',borderColor:'#36413d'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#36413d'}}
            
            />

           </View>
            {/* End Country */}



            {/* Age */}
            <View style={{marginTop:20}}>
            <DropDownPicker
                items={this.state.items}
               placeholder='Select Your Age'
               placeholderStyle={{color:'white'}}
                containerStyle={{height: 50,}}
                style={{backgroundColor: '#36413d',borderColor:'#36413d'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#36413d'}}
            
            />
         </View>
         {/* End Age */}

           <View style={{alignItems: 'center',justifyContent: 'center'}} style={{
               borderWidth:1,
               borderColor:'#60AA6D',
               width:'90%',
               marginTop:50,
               borderRadius:30,
               padding:10,
               height:50,
               alignItems: 'center',
               justifyContent: 'center',
               backgroundColor:'#60AA6D',
               left:10
            }} activeOpacity={0.8} >
           
            <TouchableOpacity >
                 
                 
                 <Text style={{fontSize:20,color:'white'}}>Register</Text>
                
                </TouchableOpacity>
               
                </View>


            </View>
            {/* End RegisterationForm */}
            </ScrollView>








            <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={180}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:'#36413d',    
            }
          }}
        >
          <TouchableOpacity style={{
            borderWidth:1,
            borderColor:'#60AA6D',
            width:'90%',
            marginTop:15,
            borderRadius:30,
            padding:10,
            height:40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'#60AA6D',

          }} activeOpacity={0.8} > 
                 <Text style={styles.getStartedText}>Pick From Library</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
            borderWidth:1,
            borderColor:'#60AA6D',
            width:'90%',
            marginTop:20,
            borderRadius:30,
            padding:10,
            height:40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'#60AA6D',

          }} activeOpacity={0.8} > 
                 <Text style={styles.getStartedText}>Camera</Text>
            </TouchableOpacity>

        </RBSheet>


            </View>
           
        )
    }
}

export default Register