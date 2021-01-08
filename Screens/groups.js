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
      title: 'Group 1',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Group 2',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Group 3',
    },
    {
        id: 'gfe71e29d72',
        title: 'Group 4',
      },]


class Groups extends React.Component{
    render(){
        return (
<View style={styles.GroupsContainer}>

             <View style={styles.ProgressBarcontainer}>
            
                <Progress.Bar progress={0.5} width={250} color={'#60AA6D'}/>
               
            </View>

            

            <View style={styles.GroupsCardsContainer}>
                <FlatList 
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={DATA}
                renderItem={({item})=>(

                <TouchableOpacity  style={styles.GroupsCard} onPress={()=>this.props.navigation.navigate('Lessons')}>
                <Image source={BoyImage} style={{width:100,height:100,borderRadius:200,marginTop:10}}/>
                 <Text style={{marginTop:3,fontFamily:'BalsamiqSans-Italic',color:'#60AA6D'}}>{item.title}</Text>
                </TouchableOpacity>

                )}
                />
            
                

              
            </View>
            
            </View>
        )
    }
}

export default Groups