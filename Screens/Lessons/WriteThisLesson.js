import React from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Icon, Badge } from 'react-native-elements'
import PropTypes from 'prop-types';
import { shuffleArray } from '../utils'
import PlaySound from './PlaySound'
import WordDropDownComponent from './WordDropDownComponent'
import FlashMessage, { showMessage } from "react-native-flash-message";


export default class WriteThisLesson extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        correct_sentence_tags: [],
        tags: [],
        user_tags_translation: [],
        lesson: [],
        translation_text: '',
        isVisibleRealMeaning: false,
    }

    static = {
        lesson: PropTypes.object,
        lessonIndex: PropTypes.number,
        nextLesson: PropTypes.func
    }

    componentDidMount() {

        let { lesson } = this.props
        let translation = lesson.lesson.translation != undefined ? lesson.lesson.translation.replace("-", " ") : undefined
        let correct_tags = translation != undefined ? translation.split(" ") : undefined
        this.setState({
            lesson: lesson,
            tags: shuffleArray(correct_tags),
            correct_sentence_tags: correct_tags
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
        let correct_tags = this.state.lesson.lesson.translation != undefined ? this.state.lesson.lesson.translation.split(" ") : undefined

        if (this.state.user_tags_translation.length == correct_tags.length) {
            for (let i = 0; i < this.state.user_tags_translation.length; i++) {
                if (this.state.user_tags_translation[i] === correct_tags[i]) {
                    count++;
                }
            }

            if (count === correct_tags.length) {
                this.props.nextLesson(true, this.props.lessonIndex);
            } else {
                // this.props.nextLesson(false, this.props.lessonIndex);
                showMessage({
                    message: "Wrong",
                    description: "",
                    type: "danger",
                    icon: "danger",
                    hideOnPress: true,

                    autoHide: false,
                    renderCustomContent: () => {
                        return (
                            <View>
                                <Text style={{ color: 'white', fontSize: 20 }}>Correct: {this.state.lesson.lesson.translation}</Text>
                                <TouchableOpacity onPress={() => {
                                    this.props.nextLesson(false, this.props.lessonIndex);

                                }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                })
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
                    <Badge
                        value={e}
                        badgeStyle={{ padding: 8, paddingVertical: 12 }}
                        textStyle={{ fontSize: 16 }}
                        containerStyle={{ margin: 8 }} />
                </TouchableOpacity>
            )
        })

        return tags;
    }

    translationTags() {
        let tags = this.state.tags.map((e, i) => {
            return (
                <TouchableOpacity onPress={() => this.translate(e, i)}>
                    <Badge
                        value={e}
                        badgeStyle={{ padding: 8, paddingVertical: 12 }}
                        textStyle={{ fontSize: 16 }} containerStyle={{ margin: 8 }} />
                </TouchableOpacity>
            )
        })

        return tags;
    }


    prepareSentence() {
        let sentence = "";
        let words = this.state.lesson.lesson.sentence != undefined ? this.state.lesson.lesson.sentence.split(" ") : undefined;
        if (words != undefined) {
            sentence = words.map((element, index) => {
                // let dropdown = this.state.lesson.dropdown[element];
                let dropdownlist = undefined
                let sound = ''
                let dropdownd = this.state.lesson.dropdown;
                let type = null;
                for (let d in dropdownd) {
                    if (dropdownd[d][element] != undefined) {
                        dropdownlist = dropdownd[d][element]
                        sound = dropdownd[d]['sound']
                        type = dropdownd[d]['type']
                        break;
                    }
                }
                return <WordDropDownComponent word={element} type={type} dropdownlist={dropdownlist} sound={sound} />
            })
        }
        return sentence == "" ? null : sentence;
    }

    async checkWriting() {
        // let tags = this.state.lesson.lesson.translation.split(" ")
        // let writing_text = this.state.translation_text.length > 0 ? this.state.translation_text.split(" ") : "";
        // let counter = 0;
        // console.log(tags)
        // console.log(writing_text)
        // console.log(!writing_text.includes(""))
        // if (tags.length == writing_text.length && !writing_text.includes("")) {

        //     for (let i = 0; i < tags.length; i++) {
        //         if (tags[i] == writing_text[i] && writing_text[i] !== "") {
        //             counter++;
        //         }
        //     }

        if (this.state.lesson.lesson.translation.length === this.state.translation_text.length) {
            if (this.state.lesson.lesson.translation === this.state.translation_text) {
                this.props.nextLesson(true, this.props.lessonIndex);
            } else {
                showMessage({
                    message: "Wrong",
                    description: "",
                    type: "danger",
                    icon: "danger",
                    hideOnPress: true,

                    autoHide: false,
                    renderCustomContent: () => {
                        return (
                            <View>
                                <Text style={{ color: 'white', fontSize: 20 }}>Correct: {this.state.lesson.lesson.translation}</Text>
                                <TouchableOpacity onPress={() => {
                                    this.props.nextLesson(false, this.props.lessonIndex);

                                }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                })
            }
        }
    }


    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 6 }}>
                <PlaySound sound={this.state.lesson.lesson.sounds} />
                <Text
                    style={{ color: '#60AA6D', fontSize: 22, fontFamily: 'BalsamiqSans-Bold' }}>
                    {this.state.lesson.lesson.write_this_in_sentence}
                </Text>

                {this.state.lesson.lesson.real_meaning && this.state.isVisibleRealMeaning &&
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'BalsamiqSans-Bold', }}>
                        {this.state.lesson.lesson.real_meaning}
                    </Text>
                }

                <View style={{ flex: 0.4, }}>
                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                        {this.prepareSentence()}
                        <Badge
                            containerStyle={{ marginTop: 22, marginLeft: 4 }}
                            value={this.state.lesson.lesson.masculine_feminine_neutral}
                            status="success"
                        />

                        {this.state.lesson.lesson.real_meaning &&
                            <Badge
                                onPress={() => this.setState({ isVisibleRealMeaning: !this.state.isVisibleRealMeaning })}
                                containerStyle={{ marginTop: 22, marginLeft: 14 }}
                                value='R'
                                status="info"
                            />
                        }
                    </View>

                    {this.state.lesson.lesson.secondary_meaning && this.state.isVisibleRealMeaning &&
                        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'BalsamiqSans-Bold', }}>
                            {this.state.lesson.lesson.secondary_meaning}
                        </Text>
                    }

                </View>
                {this.state.lesson.lesson.is_type_answer == 0 &&
                    <View
                        style={{
                            marginTop: 40, flexWrap: 'wrap', flex: 0.2,
                            borderBottomColor: 'white', borderBottomWidth: 1,
                            justifyContent: 'flex-start', flexDirection: 'row'
                        }}>
                        {/* <Text style={{ color: 'white', fontSize: 16, borderBottomColor: 'white', borderBottomWidth: 1 }}></Text> */}
                        {this.translatedTags()}
                    </View>
                }

                <View style={{ marginTop: 40, flex: 0.2, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    {this.state.lesson.lesson.is_type_answer == 1 ? (

                        <TextInput
                            onChangeText={(text) => this.setState({ translation_text: text }, () => {
                                this.checkWriting()
                            })}
                            focusable={true}
                            placeholder='write'
                            placeholderTextColor='white'
                            style={{ borderBottomWidth: 1, fontSize: 18, color: 'white', borderBottomColor: 'white', width: '100%' }} />

                    ) : (
                            <>
                                {this.translationTags()}

                            </>
                        )}
                </View>
                <FlashMessage position="bottom" />

            </View>
        )
    }

}