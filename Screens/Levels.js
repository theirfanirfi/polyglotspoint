import React from 'react'
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native'
import styles from '../Style/MainStyle'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { get, getBaseUrl } from '../apis'
import XP from '../assets/Images/xp.png'


class Levels extends React.Component {
    state = {
        language_id: 0,
        levels: [],
        selected_item_id: '',
        refreshing: true,
        xp: 20,
        isLoading: true,
    }

    async componentDidMount() {
        const { language_id } = await this.props.route.params
        const levels = await get('languages/' + language_id);
        console.log(levels);
        this.setState({ language_id: language_id, levels: levels, isLoading: false });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#080a09' }}>
                    <ActivityIndicator style={{ alignSelf: 'center' }} size="large" color="#60AA6D" />
                    <Text style={{ color: 'white', alignSelf: 'center' }}>The language is being loaded...</Text>
                </View>
            )
        }


        return (
            <View style={styles.LevelsContainer}>
                <View style={{ flexDirection: 'row', marginLeft: 12 }}>
                    <Image style={{ width: 30, height: 30 }} source={XP} />
                    <Text style={{ color: 'white', marginTop: 4, marginLeft: 8, fontSize: 16 }}>{this.state.xp}</Text>
                </View>

                <ScrollView style={{ marginTop: 18 }}>
                    {this.state.levels.map((row, index) => {
                        var level = row.level;
                        var groups = row.groups;
                        return (
                            <View style={{ marginTop: 12 }}>

                                <TouchableOpacity style={[styles.LevelCard, { alignSelf: 'center' }]}>
                                    <Image source={{ uri: getBaseUrl() + 'static/level/' + level.level_image }} style={{ width: 130, height: 130, borderRadius: 4, marginTop: 10 }} />
                                    <Text style={{ marginTop: 8, fontFamily: 'BalsamiqSans-Italic', color: '#60AA6D' }}>{level.level_name}</Text>
                                    <Text style={{ marginTop: 8, fontFamily: 'BalsamiqSans-Italic', color: '#60AA6D', position: 'absolute', bottom: 4, right: 6 }}>{level.total_done}/{level.total_groups}</Text>
                                </TouchableOpacity>
                                <View style={{ height: 150, width: 4, backgroundColor: '#60AA6D', borderColor: '#60AA6D', borderWidth: 4, alignSelf: 'center' }}>

                                </View>

                                <View
                                    style={{
                                        marginHorizontal: 12, flex: 1, flexDirection: 'row', flexWrap: 'wrap',
                                        borderTopColor: '#60AA6D', borderWidth: 1
                                    }}
                                >
                                    {groups.map((item, index) => {
                                        return (

                                            <TouchableOpacity style={[styles.GroupsCard, { marginHorizontal: 4, alignSelf: 'stretch' }]} onPress={() => {
                                                if (item.total_lessons > 0) {
                                                    this.props.navigation.navigate('Lessons', { group_id: item.group_id })
                                                }
                                            }}>
                                                <Image source={{ uri: getBaseUrl() + "/static/group/" + item.group_image }} style={{ width: 80, height: 70, borderRadius: 200, marginTop: 10 }} />
                                                <Text style={{ marginTop: 3, fontFamily: 'BalsamiqSans-Italic', color: '#60AA6D' }}>{item.group_name}</Text>
                                                <Text style={{ position: 'absolute', top: 14, left: 14, fontFamily: 'BalsamiqSans-Italic', color: '#60AA6D' }}>{item.total_lessons}</Text>

                                            </TouchableOpacity>

                                        )
                                    })}
                                </View>

                            </View>
                        )
                    })}

                </ScrollView>
                {/* <FlatList
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
                            const level = item.level
                            return (

                                <TouchableOpacity style={[styles.LevelCard, { justifyContent: 'center' }]} onPress={() => {
                                    this.setState({ selected_item_id: item.id })

                                    this.props.navigation.navigate('Groups', { level_id: level.level_id })
                                }}>
                                    <Image source={{ uri: getBaseUrl() + 'static/level/' + level.level_image }} style={{ width: 130, height: 130, borderRadius: 4, marginTop: 10 }} />
                                    <Text style={{ marginTop: 8, fontFamily: 'BalsamiqSans-Italic', color: '#60AA6D' }}>{level.level_name}</Text>
                                    <Text style={{ marginTop: 8, fontFamily: 'BalsamiqSans-Italic', color: '#60AA6D', position: 'absolute', bottom: 4, right: 6 }}>{level.total_done}/{level.total_groups}</Text>
                                </TouchableOpacity>

                            )
                        }
                        }
                    /> */}






            </View>
        )
    }
}

export default Levels