import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon, Badge } from 'react-native-elements'
import PropTypes from 'prop-types';
import { shuffleArray } from '../utils'

export default class PairsToMatchLesson extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        correct_sentence_tags: [],
        tags: [],
        user_tags_translation: [],
        lesson: []
    }

    static = {
        lesson: PropTypes.object,
        lessonIndex: PropTypes.number,
        nextLesson: PropTypes.func
    }

    componentDidMount() {

        let { lesson } = this.props
        let correct_option = lesson.lesson.translation != undefined ? lesson.lesson.translation.replace("-", " ") : undefined
        correct_option = correct_option != undefined ? correct_option.split(" ") : undefined
        let options = lesson.lesson.options_tags != undefined ? lesson.lesson.options_tags.split(";") : undefined
        this.setState({
            lesson: lesson,
            tags: shuffleArray(options),
            correct_sentence_tags: correct_option
        })


    }


    static getDerivedStateFromProps(props, state) {
        if (state.lesson != props.lesson && props.lesson != undefined) {
            return {
                lesson: props.lesson
            }
        }
        return null;
    }


    checkLesson() {
        let count = 0;
        if (this.state.user_tags_translation.length == this.state.correct_sentence_tags.length) {
            for (let i = 0; i < this.state.user_tags_translation.length; i++) {
                if (this.state.user_tags_translation[i] === this.state.correct_sentence_tags[i]) {
                    count++;
                }
            }

            if (count === this.state.correct_sentence_tags.length) {
                this.props.nextLesson(true, this.props.lessonIndex);
            } else {
                this.props.nextLesson(false, this.props.lessonIndex);
            }
        } else {
            // console.log("translated: " + this.state.user_tags_translation.length);
            // console.log("correct: " + this.state.builder.correct_sentence_length);
        }

    }

    async translate(word, index) {
        let t_tags = this.state.user_tags_translation
        let tags = this.state.tags
        tags.splice(index, 1);
        t_tags.push(word);
        this.setState({ user_tags_translation: t_tags, tags: tags }, () => {
            this.checkLesson();
        });

    }

    deTranslate(word, index) {
        let t_tags = this.state.user_tags_translation
        let tags = this.state.tags
        t_tags.splice(index, 1);
        tags.push(word);
        this.setState({ user_tags_translation: t_tags, tags: tags });

    }

    translatedTags() {
        let t_tags = this.state.user_tags_translation
        let tags = t_tags.map((e, i) => {

            return (
                <TouchableOpacity onPress={() => this.deTranslate(e, i)}>
                    <Badge value={e} badgeStyle={{ padding: 8, paddingVertical: 12 }} textStyle={{ fontSize: 16 }} containerStyle={{ margin: 8 }} />
                </TouchableOpacity>
            )
        })

        return tags;
    }

    translationTags() {
        let tags = this.state.tags.map((e, i) => {
            return (
                <TouchableOpacity onPress={() => this.translate(e, i)}>
                    <Badge value={e} badgeStyle={{ padding: 8, paddingVertical: 12 }} textStyle={{ fontSize: 16 }} containerStyle={{ margin: 8 }} />
                </TouchableOpacity>
            )
        })

        return tags;
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 6 }}>
                <Text style={{ color: 'white', fontSize: 22 }}>Tap What you hear</Text>

                <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginTop: 20 }}>
                        <Icon name='volume-up' size={80} color='green' style={{ alignSelf: 'flex-start' }} />
                    </TouchableOpacity>
                </View>




                <View style={{ marginTop: 40, flexWrap: 'wrap', flex: 0.2, borderBottomColor: 'white', borderBottomWidth: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>
                    {/* <Text style={{ color: 'white', fontSize: 16, borderBottomColor: 'white', borderBottomWidth: 1 }}></Text> */}
                    {this.translatedTags()}
                </View>

                <View style={{ marginTop: 40, flex: 0.2, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    {this.translationTags()}
                </View>

            </View>
        )
    }

}