import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native';
import MainStyle from '../Style/MainStyle';
import * as Progress from 'react-native-progress';
import { get } from '../apis';
import SentenceLessonBuilder from '../Builders/SentenceLessonBuilder';
import SimpleSentenceLesson from './Lessons/SimpleSentenceLesson'
import ImagesLesson from './Lessons/ImagesLesson'
import WriteThisLesson from './Lessons/WriteThisLesson'
import PairsToMatchLesson from './Lessons/PairsToMatchLesson'
import TapWhatYouHeardLesson from './Lessons/TapWhatYouHeardLesson'
import Questionnaire from './Lessons/Questionnaire'
import Ad from './Lessons/Ad'
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/FontAwesome'
import BottomAd from './Ads/BottomAd';
import { getRandomInt } from './utils'



class Lessons extends React.Component {
    constructor(props) {
        super(props);
        this.nextLesson = this.nextLesson.bind(this);
        this.backToLevel = this.backToLevel.bind(this);
        this.showQuestionnaire = this.showQuestionnaire.bind(this);
        this.lessonAfterAd = this.lessonAfterAd.bind(this);
        this.counter = 0;
    }

    state = {
        translation: [],
        lessons: [],
        lessonView: null,
        score: 0,
        group_id: 0,
        questionnaire: [],
        ad: [],
        bottom_ads_length: 0,
        bottom_ads: 0,
        isLoading: true,
        bottom_ad_view: null,
        ads_after_lesson: 3,
        progress: 0,
    }

    showQuestionnaire = () => {
        console.log('first is questionnaire')
        if (this.state.questionnaire != undefined) {
            this.setState({
                lessonView: <Questionnaire questionnaire={this.state.questionnaire} backToLevel={this.backToLevel} />,
                bottom_ad_view: null,
            })
        } else {
            this.backToLevel(true, 'progress saved');
        }
    }

    backToLevel = async (isDone, message) => {
        if (isDone) {
            await showMessage({
                message: "Progress saved",
                type: "success",
                position: 'bottom',
                icon: 'success'
            });

            this.props.navigation.pop();
        } else {
            showMessage({
                message: message,
                type: "danger",
                position: 'bottom',
                icon: 'danger'
            });
        }
    }
    lessonAfterAd = (index) => {
        if (index <= this.state.lessons.length) {
            this.getLesson(index);
        }
    }

    nextLesson = (isLessonPassed, index) => {
        if (isLessonPassed) {
            showMessage({
                message: "Congratulations, it was the right one.",
                type: "success",
                position: 'bottom',
                icon: 'success'
            });
            if (index + 1 <= this.state.lessons.length) {
                this.getLesson(index + 1);
            }
        } else {
            hideMessage()

            let lessons = this.state.lessons
            let lesson = lessons[index];
            lessons.splice(index, 1);
            lessons.push(lesson);

            this.setState({ lessons: lessons }, () => {
                this.getLesson(index);
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

        this.props.navigation.setOptions({
            headerShown: true,
        });
        this.counter++;
        this.setState({ progress: (index / this.state.lessons.length) })
        console.log('counter: ' + this.counter)
        console.log(this.state.ads_after_lesson)
        console.log(this.counter % this.state.ads_after_lesson == 0 && index > 0)

        var bottom_ad_index = getRandomInt(this.state.bottom_ads_length);
        if (this.counter % this.state.ads_after_lesson == 0 && index > 0) {
            console.log('ad')
            if (this.state.ad != null) {
                var ad_index = getRandomInt(this.state.ad.length);
                let ad = this.state.ad[ad_index]
                this.setState({
                    lessonView: <Ad ad={ad.ad} questionnaire={ad.questionnaire}
                        lessonAfterAd={this.lessonAfterAd}
                        navigation={this.props.navigation} lessonIndex={index}
                        showQuestionnaire={this.showQuestionnaire} />,
                    bottom_ad_view: null,
                })
            } else {
                this.showQuestionnaire();
            }
        }
        else if (index < this.state.lessons.length) {
            console.log('lesson')
            let lesson = this.state.lessons[index];
            if (lesson.lesson.is_straight_translation == 1) {
                let builder = this.buildeLesson(lesson);
                this.setState({
                    lessonView: <SimpleSentenceLesson builder={builder} lessonIndex={index} nextLesson={this.nextLesson} />,
                    bottom_ad_view: <BottomAd ad={this.state.bottom_ads[bottom_ad_index]} />
                })
            } else if (lesson.lesson.is_multiple_images == 1) {
                this.setState({
                    lessonView: <ImagesLesson lesson={lesson} lessonIndex={index} nextLesson={this.nextLesson} />,
                    bottom_ad_view: null,
                })
            } else if (lesson.lesson.is_write_this == 1) {
                this.setState({
                    lessonView: <WriteThisLesson lesson={lesson} lessonIndex={index} nextLesson={this.nextLesson} />,
                    bottom_ad_view: <BottomAd ad={this.state.bottom_ads[bottom_ad_index]} />
                })
            } else if (lesson.lesson.is_pairs_to_match == 1) {
                this.setState({
                    lessonView: <PairsToMatchLesson lesson={lesson} lessonIndex={index} nextLesson={this.nextLesson} />,
                    bottom_ad_view: <BottomAd ad={this.state.bottom_ads[bottom_ad_index]} />
                })
            } else if (lesson.lesson.is_tap_what_you_hear == 1) {
                this.setState({
                    lessonView: <TapWhatYouHeardLesson lesson={lesson} lessonIndex={index} nextLesson={this.nextLesson} />,
                    bottom_ad_view: <BottomAd ad={this.state.bottom_ads[bottom_ad_index]} />
                })
            }
        }
    }



    async componentDidMount() {
        const { group_id } = await this.props.route.params
        let lessons = await get(`lessons/group/${group_id}`)
        this.setState({
            lessons: lessons.lessons,
            questionnaire: lessons.questionnaire != undefined ? lessons.questionnaire : null,
            ad: lessons.ads.length > 0 ? lessons.ads : null,
            group_id: group_id,
            ads_after_lesson: lessons.ads_setting,
            bottom_ads: lessons.bottom_ads,
            bottom_ads_length: lessons.bottom_ads.length > 0 ? lessons.bottom_ads.length : 0,
            isLoading: false,
        }, () => this.getLesson(0));
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#080a09' }}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={{ color: 'white' }}>Please wait a moment</Text>
                </View>
            )
        }

        return (
            <View style={MainStyle.LessonsContainer}>
                <View style={{ padding: 12 }}>
                    <Progress.Bar progress={this.state.progress} color="#60AA6D" width={null} />

                </View>
                {/* <Icon name='heart' size={20} style={{ color: 'red', marginRight: 12, marginTop: 12, alignSelf: 'flex-end' }} >
                    <Text style={{ color: 'white', marginLeft: 4 }}>  {this.state.score}</Text>
                </Icon> */}
                <>
                    {this.state.lessonView}

                    {this.state.bottom_ads.length > 0 && this.state.bottom_ad_view}
                </>
                <FlashMessage position="bottom" />

            </View>
        )
    }

}

export default Lessons