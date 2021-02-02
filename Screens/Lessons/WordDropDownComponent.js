import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TrackPlayer from 'react-native-track-player';
import SentenceLessonBuilder from '../../Builders/SentenceLessonBuilder';
import Tooltip from 'react-native-walkthrough-tooltip';
import { getBaseUrl } from '../../apis/'
export default class SimpleSentenceLesson extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        word: null,
        dropdown: [],
        popup: false,
        sound: ''
    }

    static = {
        builder: SentenceLessonBuilder
    }

    async componentDidMount() {
        let { word, dropdownlist, sound } = await this.props
        this.setState({ sound: sound, word: word, dropdown: dropdownlist != undefined ? dropdownlist.split(";") : undefined }, async () => {
            await TrackPlayer.setupPlayer({});
            await TrackPlayer.updateOptions({
                stopWithApp: true,
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                    TrackPlayer.CAPABILITY_STOP
                ],
                compactCapabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE
                ]
            });


        })
    }

    getPlayBackState(playback) {
        switch (state) {
            case TrackPlayer.STATE_NONE:
                return "None";
            case TrackPlayer.STATE_PLAYING:
                return "Playing";
            case TrackPlayer.STATE_PAUSED:
                return "Paused";
            case TrackPlayer.STATE_STOPPED:
                return "Stopped";
            case TrackPlayer.STATE_BUFFERING:
                return "Buffering";
        }
    }

    playSound = async () => {
        let url = getBaseUrl() + 'static/audio/' + this.state.sound
        // console.log(url);
        await TrackPlayer.reset();
        await TrackPlayer.add({
            id: 'tap-what-you-hear',
            url: url
        })
        if (this.state.playback == 'Playing') {
            this.setState({ playback: 'Stop' }, async () => {
                console.log('stopped')
                await TrackPlayer.stop()
                // await TrackPlayer.play()

            })
        } else {
            this.setState({ playback: 'Playing' }, async () => {
                console.log('play')
                await TrackPlayer.play()
            })
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.word != props.word && props.word != undefined) {
            return {
                word: props.word,
                dropdown: props.dropdownlist != undefined ? props.dropdownlist.split(";") : undefined,
                sound: props.sound
            }
        }
    }

    prepareDropDown(words) {
        let dropdown = words.map((e, i) => {
            return <Text>{e}</Text>
        })

        return dropdown;
    }

    getWord() {
        if (this.state.dropdown != undefined) {
            return (
                <Tooltip
                    isVisible={this.state.popup}
                    content={
                        <>
                            {this.prepareDropDown(this.state.dropdown)}
                        </>
                    }
                    placement="bottom"
                    showChildInTooltip={false}
                    onClose={() => this.setState({ popup: false })}

                >
                    <Text onPress={() => this.setState({ popup: !this.state.popup }, () => this.playSound())} style={{ color: '#60AA6D', fontSize: 20, fontFamily: 'BalsamiqSans-Bold', alignSelf: 'flex-start', textDecorationLine: 'underline', marginHorizontal: 3, marginVertical: 1 }}>{this.state.word.replace("-", " ")}</Text>
                </Tooltip>
            )
        } else {
            return <Text style={{ color: 'white', fontSize: 20, fontFamily: 'BalsamiqSans-Bold', marginHorizontal: 3, alignSelf: 'flex-start' }}>{this.state.word.replace("-", " ")}</Text>
        }
    }

    render() {
        return (
            <View style={{ flexWrap: 'wrap' }}>

                { this.getWord()}
            </View>

        )
    }

}