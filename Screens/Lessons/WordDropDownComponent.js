import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import SentenceLessonBuilder from '../../Builders/SentenceLessonBuilder';
import Tooltip from 'react-native-walkthrough-tooltip';
export default class SimpleSentenceLesson extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        word: null,
        dropdown: [],
        popup: false,
    }

    static = {
        builder: SentenceLessonBuilder
    }

    async componentDidMount() {
        let { word, dropdownlist } = await this.props
        this.setState({ word: word, dropdown: dropdownlist != undefined ? dropdownlist.split(";") : undefined })
    }

    static getDerivedStateFromProps(props, state) {
        if (state.word != props.word && props.word != undefined) {
            return {
                word: props.word,
                dropdown: props.dropdownlist != undefined ? props.dropdownlist.split(";") : undefined
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
                    <Text onPress={() => this.setState({ popup: !this.state.popup })} style={{ color: '#60AA6D', fontSize: 20, fontFamily: 'BalsamiqSans-Bold', alignSelf: 'flex-start', textDecorationLine: 'underline', marginHorizontal: 3, marginVertical: 1 }}>{this.state.word.replace("-", " ")}</Text>
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