import React from 'react'
import { Text, View, Image } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import PropTypes from 'prop-types';
import TagSelector from 'react-native-tag-selector';
import { post, getToken, getBaseUrl } from '../../apis/';


export default class Ad extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        ad: [],
    }

    static = {
        ad: PropTypes.object,
        lessonIndex: PropTypes.number,
        backToLevel: PropTypes.func
    }

    componentDidMount() {

        let { ad } = this.props
        this.setState({
            ad: ad,
        });

        setTimeout(() => {
            this.props.showQuestionnaire();
        }, 3000)


    }




    static getDerivedStateFromProps(props, state) {
        if (state.ad != props.ad && props.ad != undefined) {
            return {
                ad: props.ad,
            }
        }
        return null;
    }



    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 6, justifyContent: 'center' }}>
                <Image style={{ width: '90%', height: '90%' }} source={{ uri: getBaseUrl() + 'static/ads/' + this.state.ad.ad_image }} />
            </View>
        )
    }

}