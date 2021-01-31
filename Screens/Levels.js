import React from 'react'
import { View, Text, Image, FlatList, RefreshControl } from 'react-native'
import styles from '../Style/MainStyle'
import * as Progress from 'react-native-progress';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { get, getBaseUrl } from '../apis'

class Levels extends React.Component {
    state = {
        language_id: 0,
        levels: [],
        selected_item_id: '',
        refreshing: true,
    }

    async componentDidMount() {
        const { language_id } = await this.props.route.params
        const levels = await get('languages/' + language_id);
        this.setState({ language_id: language_id, levels: levels, refreshing: false });
    }
    render() {



        return (
            <View style={styles.LevelsContainer}>
                {/* <View style={styles.ProgressBarcontainer}>

                    <Progress.Bar progress={0.3} width={250} color={'#60AA6D'} />

                </View> */}

                {/* <Text style={{ marginTop: 20, color: 'white', left: 20, color: '#60AA6D', fontSize: 18, fontFamily: 'BalsamiqSans-Bold' }}>Which one of These is the 'Boy ' ? </Text> */}


                <View style={styles.LevelCardsContainer}>
                    <FlatList
                        numColumns={2}
                        refreshControl={
                            <RefreshControl
                                enabled={true}
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                        keyExtractor={(item) => { return item.level_id }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        data={this.state.levels}
                        renderItem={({ item }) => {
                            return (

                                <TouchableOpacity style={styles.LevelCard} onPress={() => {
                                    this.setState({ selected_item_id: item.id })

                                    this.props.navigation.navigate('Groups', { level_id: item.level_id })
                                }}>
                                    <Image source={{ uri: getBaseUrl() + 'static/level/' + item.level_image }} style={{ width: 130, height: 130, borderRadius: 4, marginTop: 10 }} />
                                    <Text style={{ marginTop: 8, fontFamily: 'BalsamiqSans-Italic', color: '#60AA6D' }}>{item.level_name}</Text>
                                </TouchableOpacity>

                            )
                        }
                        }
                    />




                </View>

            </View>
        )
    }
}

export default Levels