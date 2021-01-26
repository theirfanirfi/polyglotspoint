import React from 'react'
import { Text, View, Button, TouchableOpacity } from 'react-native';
import MainStyle from '../Style/MainStyle';
import * as Progress from 'react-native-progress';
import { getLanuguageLessons, get, getBaseUrl } from '../apis';
import SentenceLessonBuilder from '../Builders/SentenceLessonBuilder';
import SimpleSentenceLesson from './Lessons/SimpleSentenceLesson'
import ImagesLesson from './Lessons/ImagesLesson'
import WriteThisLesson from './Lessons/WriteThisLesson'
import PairsToMatchLesson from './Lessons/PairsToMatchLesson'
import TapWhatYouHeardLesson from './Lessons/TapWhatYouHeardLesson'
import Questionnaire from './Lessons/Questionnaire'
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/FontAwesome'



class Lessons extends React.Component {
    constructor(props) {
        super(props);
        this.nextLesson = this.nextLesson.bind(this);
        this.backToLevel = this.backToLevel.bind(this);
    }

    state = {
        translation: [],
        lessons: [],
        lessonView: null,
        score: 0,
        group_id: 0,
        questionnaire: []
    }
    backToLevel = (group) => {
        console.log(group)
    }

    nextLesson = (isLessonPassed, index) => {
        if (isLessonPassed) {
            showMessage({
                message: "Congratulations, it was the right one.",
                type: "success",
                position: 'bottom',
                icon: 'success'
            });
            this.setState({ score: this.state.score + 1 });
            if (index + 1 <= this.state.lessons.length) {
                this.getLesson(index + 1);
            }
        } else {
            showMessage({
                message: "Wrong",
                type: "danger",
                position: 'bottom',
                icon: 'danger'
            });
            console.log('failed index: ' + index);
            let lessons = this.state.lessons
            let lesson = lessons[index];
            lessons.splice(index, 1);
            lessons.push(lesson);

            this.setState({ lessons: lessons }, () => {
                this.getLesson(index);
                // console.log('failed length: ' + this.state.lessons.length)
            });

        }
    }

    buildeLesson(lesson) {
        let builder = null;
        if (lesson != undefined && lesson.lesson.is_straight_translation == 1) {
            builder = new SentenceLessonBuilder(lesson)
                .splitSentence()
                .splitTranslation()
                .makeSentence()
                .formSentenceWithWordsDropDown()
                .makeTranslation()
                .makeTags()
                .lengthOfCorrectSentence()
                .build();
            return builder;
        }
    }

    getLesson = (index) => {
        if (index < this.state.lessons.length) {
            let lesson = this.state.lessons[index];
            if (lesson.lesson.is_straight_translation == 1) {
                let builder = this.buildeLesson(lesson);
                this.setState({
                    lessonView: <SimpleSentenceLesson builder={builder} lessonIndex={index} nextLesson={this.nextLesson} />
                })
            } else if (lesson.lesson.is_multiple_images == 1) {
                this.setState({
                    lessonView: <ImagesLesson lesson={lesson} lessonIndex={index} nextLesson={this.nextLesson} />
                })
            } else if (lesson.lesson.is_write_this == 1) {
                this.setState({
                    lessonView: <WriteThisLesson lesson={lesson} lessonIndex={index} nextLesson={this.nextLesson} />
                })
            } else if (lesson.lesson.is_pairs_to_match == 1) {
                this.setState({
                    lessonView: <PairsToMatchLesson lesson={lesson} lessonIndex={index} nextLesson={this.nextLesson} />
                })
            } else if (lesson.lesson.is_tap_what_you_hear == 1) {
                this.setState({
                    lessonView: <TapWhatYouHeardLesson lesson={lesson} lessonIndex={index} nextLesson={this.nextLesson} />
                })
            }
        } else if (index == this.state.lessons.length) {
            this.setState({
                lessonView: <Questionnaire questionnaire={this.state.questionnaire} lessonIndex={index} backToLevel={this.backToLevel} />
            })
        }
    }
    async componentDidMount() {
        const { group_id } = await this.props.route.params
        let lessons = await get(`lessons/group/${group_id}`)
        this.setState({
            lessons: lessons.lessons,
            questionnaire: lessons.questionnaire,
            group_id: group_id
        }, () => this.getLesson(0));
    }

    render() {
        return (
            <View style={MainStyle.LessonsContainer}>
                <Icon name='heart' size={20} style={{ color: 'red', marginRight: 12, marginTop: 12, alignSelf: 'flex-end' }} >
                    <Text style={{ color: 'white', marginLeft: 4 }}>  {this.state.score}</Text>
                </Icon>
                <>
                    {this.state.lessonView}
                </>
                <FlashMessage position="bottom" />

            </View>
        )
    }
}

export default Lessons