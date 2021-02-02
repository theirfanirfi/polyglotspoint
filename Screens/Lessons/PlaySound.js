import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import TrackPlayer from 'react-native-track-player';
import { Icon } from 'react-native-elements'
import { getBaseUrl } from '../../apis/'


export default class PlaySound extends React.PureComponent {
    state = {
        sound: ''
    }
    static = {
        sound: PropTypes.string
    }

    async componentDidMount() {
        let sound = await this.props.sound
        this.setState({
            sound: sound
        }, async () => {
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

    static getStateDerivedFromProps(props, state) {
        if (state.sound != props.sound && props.sound != undefined) {
            return {
                sound: props.sound
            }
        }
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

    render() {
        return (
            <>
                <TouchableOpacity style={{ marginTop: 20 }}>
                    <Icon onPress={() => this.playSound()} name='volume-up' size={40} color='#60AA6D' style={{ alignSelf: 'flex-start' }} />
                </TouchableOpacity>
            </>
        )
    }
}