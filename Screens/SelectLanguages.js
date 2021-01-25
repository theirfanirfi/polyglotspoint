import React from 'react';
import { View, Text, Button, FlatList, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../Style/MainStyle';
import Flag from '../assets/Images/americaFlag.png';
import * as Progress from 'react-native-progress';
import { plainToClass } from 'class-transformer';
import { Language } from '../models/Language';
import { get, getBaseUrl } from '../apis/'



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
  state = {
    languages: []
  }
  async componentDidMount() {
    const languages = await get('languages')
    this.setState({ languages: languages })
  }

  render() {
    return (
      <View style={styles.SelctLanguagescontainer}>
        <FlatList
          data={this.state.languages}
          keyExtractor={(item) => { return item.language_id }}
          renderItem={({ item }) => {
            let image = getBaseUrl() + 'static/language/' + item.language_image
            return (
              <TouchableOpacity
                style={styles.CountriesCards}
                onPress={() => this.props.navigation.navigate('Levels', { language_id: item.language_id })}>
                <Image source={{ uri: image }} style={{ width: 35, height: 35, right: 90 }} />

                <Text style={styles.CountriesCardsText} key={item.key}>
                  {'  '}
                  {item.language_name}
                </Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    );
  }
}

export default SelectLanguages;
