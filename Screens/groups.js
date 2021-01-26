import React from 'react'
import { View, Text, Button, Image, FlatList } from 'react-native'
import styles from '../Style/MainStyle'
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome'
import BoyImage from '../assets/Images/boy.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { get, getBaseUrl } from '../apis/';
import ProgressCircle from 'react-native-progress-circle'

class Groups extends React.Component {
  state = {
    groups: [],
    level_id: 0,
  }

  async componentDidMount() {
    const { level_id } = await this.props.route.params
    const groups = await get(`levels/${level_id}`)
    this.setState({
      groups: groups,
      level_id: level_id
    })
  }
  render() {
    return (
      <View style={styles.GroupsContainer}>

        <View style={styles.ProgressBarcontainer}>

          <Progress.Bar progress={0.5} width={250} color={'#60AA6D'} />

        </View>



        <View style={styles.GroupsCardsContainer}>
          <FlatList
            numColumns={2}
            keyExtractor={(item) => { return item.group_id }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            data={this.state.groups}
            renderItem={({ item }) => (
              <ProgressCircle
                percent={50}
                radius={60}
                borderWidth={8}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff"
              >
                <TouchableOpacity style={styles.GroupsCard} onPress={() => this.props.navigation.navigate('Lessons', { group_id: item.group_id })}>
                  {/* <Image source={BoyImage} style={{ width: 100, height: 100, borderRadius: 200, marginTop: 10 }} /> */}
                  <Text style={{ marginTop: 3, fontFamily: 'BalsamiqSans-Italic', color: '#60AA6D' }}>{item.group_name}</Text>
                </TouchableOpacity>
              </ProgressCircle>
            )}
          />




        </View>

      </View>
    )
  }
}

export default Groups