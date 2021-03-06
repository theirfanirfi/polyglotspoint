import React from 'react'
import { Text, View } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import PropTypes from 'prop-types';
import TagSelector from 'react-native-tag-selector';
import { post, getToken, get } from '../../apis/';


export default class Questionnaire extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedTags: [],
        tags: [],
        questionnaire: [],
        u_tags: []
    }

    static = {
        questionnaire: PropTypes.object,
        lessonIndex: PropTypes.number,
        backToLevel: PropTypes.func
    }

    componentDidMount() {

        let { questionnaire } = this.props
        let q_tags = questionnaire.q_tags != undefined ? questionnaire.q_tags.split(";") : undefined
        let formated_tags = []

        q_tags.forEach((e, i) => {
            formated_tags.push({ id: i, name: e });
        })

        this.setState({
            questionnaire: questionnaire,
            tags: formated_tags,
            u_tags: q_tags
        })


    }

    saveProgress = async () => {
        let questionnaire_tags = []
        this.state.selectedTags.forEach((e, i) => {
            questionnaire_tags.push(this.state.u_tags[i]);
        })
        let token = await getToken()

        let form = new FormData()
        form.append("group_id", this.state.questionnaire.group_id);
        form.append("q_tags", JSON.stringify(questionnaire_tags));
        form.append("language_id", this.state.questionnaire.language_id);
        form.append("level_id", this.state.questionnaire.level_id);

        let response = await post('acomplishments/save_progress', form, token)
        if (response.isSaved) {
            this.props.backToLevel(true, '');
        } else {
            this.props.backToLevel(false, response.message)
        }
    }



    static getDerivedStateFromProps(props, state) {
        if (state.questionnaire != props.questionnaire && props.questionnaire != undefined) {
            return {
                questionnaire: props.questionnaire,
                selectedTags: []
            }
        }
        return null;
    }


    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 6, justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 22, alignSelf: 'center', fontFamily: 'BalsamiqSans-Bold', }}>Tier Completed</Text>
                <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', fontFamily: 'BalsamiqSans-Bold', }}>Answer Questionnaire and Save the progress</Text>



                <View style={{ marginTop: 40, flexWrap: 'wrap', flex: 0.6, borderBottomColor: 'white', alignItems: 'center', alignContent: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <TagSelector
                        style={{ alignSelf: 'center' }}
                        maxHeight={70}
                        tags={this.state.tags}
                        onChange={(selected) => this.setState({ selectedTags: selected })} />
                </View>

                <View style={{ flex: 0.2, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button
                        onPress={() => this.saveProgress()}
                        buttonStyle={{ backgroundColor: '#3FCA89' }}
                        icon={
                            <Icon
                                name="check-circle"
                                size={20}
                                color="white"
                            />
                        }
                        title=" Save Progress"
                    />
                </View>

            </View>
        )
    }

}