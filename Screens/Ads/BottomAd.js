import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { getBaseUrl } from '../../apis/';


export default class BottomAd extends React.Component {

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

        // let { ad } = this.props.route.params
        let { ad } = this.props
        this.setState({
            ad: ad,
        });
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
            <TouchableWithoutFeedback onPress={() => { console.log(this.state.ad.ad_link) }} style={{ position: 'absolute', bottom: 5, }}>
                <Image style={{ width: '70%', height: '8%', alignSelf: 'center' }} source={{ uri: getBaseUrl() + 'static/ads/' + this.state.ad.ad_image }} />
            </TouchableWithoutFeedback>
        )
    }

}