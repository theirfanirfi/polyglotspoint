import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import SentenceLessonBuilder from '../../Builders/SentenceLessonBuilder';
import WordDropDownComponent from './WordDropDownComponent'
import { Badge } from 'react-native-elements'
import PropTypes from 'prop-types';
import PlaySound from './PlaySound'

export default class SimpleSentenceLesson extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        correct_sentence_tags: [],
        tags: [],
        user_tags_translation: [],
        lesson: [],
        builder: SentenceLessonBuilder
    }

    static = {
        builder: SentenceLessonBuilder,
        lessonIndex: PropTypes.number,
        nextLesson: PropTypes.func
    }

    componentDidMount() {

        let { builder } = this.props
        this.setState({ builder: builder, user_tags_translation: [], tags: builder.tags, correct_sentence_tags: builder.tags, })
    }

    async componentDidUpdate() {
        // let { builder } = await this.props
        // this.setState({ builder: builder, tags: builder.tags, correct_sentence_tags: builder.tags, })
    }

    static getDerivedStateFromProps(props, state) {
        if (state.builder != props.builder && props.builder != undefined) {
            return {
                builder: props.builder,
                user_tags_translation: [],

            }
        }
    }
    prepareSentence() {
        let sentence = "";
        let builder = this.state.builder
        if (builder != undefined) {
            sentence = builder.words.map((element, index) => {
                let dropdownlist = {}
                let sound = ''
                let dropdown = builder.lesson.dropdown;

                for (let d in dropdown) {
                    if (dropdown[d][element] != undefined) {
                        dropdownlist = dropdown[d][element];
                        sound = dropdown[d]['sound']
                        break;
                    }
                }

                return <WordDropDownComponent word={element} dropdownlist={dropdownlist} sound={sound} />
            })
        }

        return sentence == "" ? null : sentence;
    }

    checkLesson() {
        let count = 0;
        if (this.state.user_tags_translation.length == this.state.builder.correct_sentence_length) {
            for (let i = 0; i < this.state.user_tags_translation.length; i++) {
                if (this.state.user_tags_translation[i] === this.state.builder.correct_sentence[i]) {
                    count++;
                }
            }

            if (count === this.state.builder.correct_sentence_length) {
                // this.props.nextLesson(true, this.props.lessonIndex, this.props.context);
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
        let tags = this.state.builder.tags.map((e, i) => {
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
                <Text style={{ color: '#60AA6D', fontSize: 22, fontFamily: 'BalsamiqSans-Bold', }}>Translate</Text>
                <PlaySound sound={this.state.builder.lesson.lesson.sounds} />
                <View style={{ flex: 0.4, flexDirection: 'row', marginTop: 12 }}>

                    {this.prepareSentence()}
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