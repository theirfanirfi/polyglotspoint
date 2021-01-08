import React from 'react'
import {View,Text, Button,Image,FlatList} from 'react-native'
import styles from '../Style/MainStyle'
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome'
import BoyImage from '../assets/Images/boy.png'
import { TouchableOpacity } from 'react-native-gesture-handler';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Russian',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'English',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Urdu',
    },
    {
        id: 'gfe71e29d72',
        title: 'Hindi',
      },]

     

class Levels extends React.Component{
    state= {
       
        selected_item_id:''
    }
    render(){
     
       

        return (
            <View style={styles.LevelsContainer}>
             <View style={styles.ProgressBarcontainer}>
            
                <Progress.Bar progress={0.3} width={250} color={'#60AA6D'}/>
               
            </View>

            <Text style={{marginTop:20,color:'white',left:20,color:'#60AA6D',fontSize:18,fontFamily:'BalsamiqSans-Bold'}}>Which one of These is the 'Boy ' ? </Text>


            <View style={styles.LevelCardsContainer}>
                <FlatList 
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={DATA}
                renderItem={({item})=>(

                <TouchableOpacity  style={styles.LevelCard} onPress={()=>{
                    this.setState({selected_item_id:item.id})
                    
                    this.props.navigation.navigate('Groups')
                    }}>
                <Image source={BoyImage} style={{width:130,height:130,borderRadius:4,marginTop:10}}/>
                 <Text style={{marginTop:8,fontFamily:'BalsamiqSans-Italic',color:'#60AA6D'}}>{item.title}</Text>
                </TouchableOpacity>

                )}
                />
            
                

               
            </View>
            
            </View>
        )
    }
}

export default Levels