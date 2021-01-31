import React from 'react';
import { View, Text, FlatList, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../Style/MainStyle';
import * as Progress from 'react-native-progress';
import { get, getBaseUrl } from '../apis/'


class SelectLanguages extends React.Component {
  state = {
    languages: [],
    refreshing: true,
    isLoading: true,
  }
  async componentDidMount() {
    const languages = await get('languages')
    this.setState({ languages: languages, refreshing: false, isLoading: false })
  }
  onRefresh = async () => {
    this.setState({ refreshing: true });
    const languages = await get('languages')
    this.setState({ languages: languages, refreshing: false, isLoading: false })
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#080a09' }}>
          <ActivityIndicator style={{ alignSelf: 'center' }} size="large" color="#60AA6D" />
          <Text style={{ color: 'white', alignSelf: 'center' }}>Please wait...</Text>
        </View>
      )
    }
    return (
      <View style={styles.SelctLanguagescontainer}>
        <FlatList
          data={this.state.languages}
          keyExtractor={(item) => { return item.language_id }}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
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
