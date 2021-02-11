import React from 'react'
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import WordDropDownComponent from './WordDropDownComponent'
import { Badge, Icon } from 'react-native-elements'
import PropTypes from 'prop-types';
import { getBaseUrl } from '../../apis';
import PlaySound from './PlaySound'

export default class ImagesLesson extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        correct_word: '',
        images: [],
        images_bottom_words: [],
        lesson: [],
        isVisibleRealMeaning: false,

    }

    static = {
        lesson: PropTypes.object,
        lessonIndex: PropTypes.number,
        nextLesson: PropTypes.func
    }

    async componentDidMount() {

        let { lesson } = this.props
        let images = await JSON.parse(lesson.lesson.images)
        let bottomWords = await JSON.parse(lesson.lesson.words_for_images)
        let images_list = []
        await images.forEach((e, i) => {
            images_list.push({ id: i, image: e, word: bottomWords[i] })

        })

        this.setState({ lesson: lesson, images: images_list, correct_word: lesson.lesson.translation })
    }

    static getDerivedStateFromProps(props, state) {
        if (state.lesson != props.lesson && props.lesson != undefined) {
            return {
                lesson: props.lesson
            }
        }

        return null;
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



    checkLesson(word) {

        if (word === this.state.correct_word) {
            this.props.nextLesson(true, this.props.lessonIndex);
        } else {
            this.props.nextLesson(false, this.props.lessonIndex);
        }

    }



    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 6 }}>
                <PlaySound sound={this.state.lesson.lesson.sounds} />

                {this.state.lesson.lesson.real_meaning && this.state.isVisibleRealMeaning &&
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'BalsamiqSans-Bold', }}>
                        {this.state.lesson.lesson.real_meaning}
                    </Text>
                }
                <View style={{ flex: 0.4, }}>
                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                        {this.prepareSentence()}
                        <Badge
                            containerStyle={{ marginTop: 8, marginLeft: 2 }}
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


                <FlatList
                    style={{ flex: 0.8, flexDirection: 'column', flexWrap: 'wrap' }}
                    data={this.state.images}
                    keyExtractor={(item) => { return item.id; }}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        console.log(getBaseUrl() + "static/lesson/" + item.image);
                        return (
                            <TouchableOpacity key={index} onPress={() => this.checkLesson(item.word)} style={{ width: '48%', borderWidth: 1, margin: 4, borderColor: 'white', justifyContent: 'center' }}>
                                <Image style={{ width: 180, height: 200 }} source={{ uri: getBaseUrl() + "static/lesson/" + item.image }} />
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>{item.word}</Text>
                            </TouchableOpacity>
                        )
                    }}

                />


            </View>
        )
    }

}