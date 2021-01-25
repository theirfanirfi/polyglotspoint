import React from 'react';
import { View, Text, Button, FlatList, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../Style/MainStyle';
import Flag from '../assets/Images/americaFlag.png';
import * as Progress from 'react-native-progress';
import { plainToClass } from 'class-transformer';
import { Language } from '../models/Language';
import SentenceLessonBuilder from '../Builders/SentenceLessonBuilder'


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
  },
  {
    id: 'asdd72',
    title: 'Spanish',
  },
  {
    id: 'asddasd72',
    title: 'Spanish',
  },
  {
    id: 'asdasasdsd72',
    title: 'Spanish',
  },
  {
    id: 'asdaasdsdd72',
    title: 'Spanish',
  },
  {
    id: 'asdasdaasdad72',
    title: 'Spanish',
  },
  {
    id: 'asddasdasd72',
    title: 'Spanish',
  },
  {
    id: 'asddf7asdf2',
    title: 'Spanish',
  },
];

let navigateToAccount = '';

class SelectLanguages extends React.Component {

  async componentDidMount() {
    // let response = await fetch("http://192.168.10.7:3000/api/lessons/")
    // // .then((response) => response.json())
    // // .then((json) => {
    // //   console.log(json)

    // // });
    // let res = await response.json();
    // // let lesson = {
    // //   'sentence': 'some thing is-not working',
    // //   'dropdown': {
    // //     'some': 'x;y;z',
    // //     'is-not': 'a;b;c',
    // //   },
    // //   'translation': 'some translation'
    // // };




    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => {
        const realUsers = plainToClass(Language, json);
        realUsers.getLanguage();
      });
  }

  render() {
    return (
      <View style={styles.SelctLanguagescontainer}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.CountriesCards}
              onPress={() => this.props.navigation.navigate('Levels')}>
              <Image source={Flag} style={{ width: 35, height: 35, right: 90 }} />

              <Text style={styles.CountriesCardsText} key={item.key}>
                {' '}
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default SelectLanguages;
