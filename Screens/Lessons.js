import React from 'react'
import { Text, View,Button,TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import BoyImage from '../assets/Images/boy.png'
import MainStyle from '../Style/MainStyle';
import * as Progress from 'react-native-progress';

const sentence = 'Hi how are you'


class Lessons extends React.Component{
    
    state = {
        translation : [],
        picked_item_id:'',
       
    }
     
    render() {
        return (
            <View style={MainStyle.LessonsContainer}>
                 <View style={styles.ProgressBarcontainer}>
            
            <Progress.Bar progress={0.7} width={250} color={'#60AA6D'}/>
           
        </View>

                <View style={MainStyle.LessonsCardContainer}>  
               
                    <Text style={{color:'#60AA6D',fontSize:18,fontFamily:'BalsamiqSans-Bold'}}>Translate the Following</Text>

                     <View style={{display:'flex',flexWrap:'wrap',flexDirection: 'row',marginTop:15}}>
                     <TouchableOpacity> 
                         <Text>
                         <Icon name='volume-up' size={30} color='#60AA6D'/>
                         </Text>
                         </TouchableOpacity>
                    <Text style={{color:'white',fontSize:18,fontFamily:'BalsamiqSans-Bold',left:10}}>{sentence}</Text>
                    </View>
                    
                    {/* Translation */}

                    <Text style={{color:'#60AA6D',
                    fontSize:18,
                    fontFamily:'BalsamiqSans-Bold' ,
                    marginTop:40}}>Translation</Text>
                    

                    <View style={MainStyle.SeparatewordsContainer}>
                    {this.state.translation.map(item=>{
                        return(
                            <Text key={item} style={MainStyle.sentence}>{item}</Text>
                        )
                    })}

                    </View>



                   

                    <View style={MainStyle.SeparatewordsContainer}>

                    {sentence.split(' ').map((data,index)=>{
                       
                       if(this.state.picked_item_id.includes(index)){
                           return null
                       }else{
                        return(
                            <TouchableOpacity  style={MainStyle.wordsContainer} key={data} onPress={()=>{ 
                               
                                    this.setState({translation:[this.state.translation+' '+data],picked_item_id:this.state.picked_item_id+index})
                                     
                                       
                                   
                                }}>
                           <Text  style={{color:'white'}}>{data} </Text>
                            </TouchableOpacity>
                        )
                       }
                         
                       
                     

                    })}

                     </View>

              
                
                 

                </View>

            </View>
        )
    }
}

export default Lessons