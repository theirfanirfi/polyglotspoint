import React from 'react'
import { Text, View, Image, TextInput, TouchableHighlight } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import PropTypes from 'prop-types';
import TagSelector from 'react-native-tag-selector';
import { post, getToken, getBaseUrl } from '../../apis/';
import FlashMessage, { showMessage } from "react-native-flash-message";


export default class Ad extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        ad: [],
        questionnaire: [],
        showQuestionnaire: false,
    }

    static = {
        ad: PropTypes.object,
        lessonIndex: PropTypes.number,
        backToLevel: PropTypes.func
    }


    componentDidMount() {
        // let { ad } = this.props.route.params
        let { ad, navigation, questionnaire } = this.props


        navigation.setOptions({
            headerShown: false,
        });

        console.log(questionnaire)

        this.setState({
            ad: ad,
            questionnaire: questionnaire
        });



        setTimeout(() => {
            // this.props.navigation.pop();
            // this.props.showQuestionnaire();
            this.setState({ showQuestionnaire: true });
        }, 5000)


    }

    showAd() {
        // this.setState({ showQuestionnaire: false });

        // setTimeout(() => {
        //     this.setState({ showQuestionnaire: true });
        // }, 5000)


    }




    static getDerivedStateFromProps(props, state) {
        if (state.ad != props.ad && props.ad != undefined) {
            return {
                ad: props.ad,
            }
        }
        return null;
    }

    renderContent() {
        return (
            <View style={{ backgroundColor: 'red' }}>
                <Text>Wrong</Text>
                <Text>Right: some thing is right, if it is not wrong</Text>
                <Button title="Continue" />
            </View>
        )
    }

    render() {

        if (!this.state.showQuestionnaire) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 6, justifyContent: 'center' }}>
                    <Image style={{ width: '90%', height: '90%' }} source={{ uri: getBaseUrl() + 'static/ads/' + this.state.ad.ad_image }} />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 6, }}>
                    <Button title="Back to Ad" onPress={() => this.showAd()} />
                    {this.state.questionnaire.map((question, index) => {
                        return (
                            <View style={{ width: '100%', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}>{question.q_question}</Text>
                                {
                                    question.is_answer_to_write == 1 ? (

                                        <>
                                            <TextInput
                                                onChangeText={(text) => console.log(text)}
                                                focusable={true}
                                                placeholder='write'
                                                placeholderTextColor='white'
                                                style={{ borderBottomWidth: 1, fontSize: 18, color: 'white', borderBottomColor: 'white', width: '100%' }} />
                                        </>
                                    ) : (
                                            <>
                                                <Text style={{ color: 'white', fontSize: 16 }}>{question.q_tags}</Text>
                                            </>

                                        )
                                }
                            </View>
                        )
                    })}
                    <FlashMessage position="bottom" />

                </View>
            )
        }
    }

}