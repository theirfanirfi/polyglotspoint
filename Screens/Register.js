import React from 'react'
import styles from '../Style/GetStartstyle'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, NativeModules, Button } from 'react-native'

import RBSheet from "react-native-raw-bottom-sheet";
import { get, post } from '../apis/';
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Register extends React.Component {
    state = {
        country: '',
        items: [],
        continents: [],
        countries: [],
        form_fullname: "",
        form_email: "",
        form_password: "",
        form_gender: "",
        form_continent: "",
        form_country: "",
        form_age: ""

    }

    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('user', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    async componentDidMount() {
        const response = await get('users/registeration_details')

        let countries = response.countries.map((e, i) => {

            return { label: e.country_name, value: e.country_id, icon: () => <Icon name="flag" size={18} color='#60AA6D' /> }

        })

        let continents = response.continents.map((e, i) => {

            return { label: e.continent_name, value: e.continent_id, icon: () => <Icon name="flag" size={18} color='#60AA6D' /> }

        })

        this.setState({ continents: response.continents, countries: countries, continents: continents })

    }


    initiateRegisteration = async () => {
        let formdata = new FormData()
        formdata.append("fullname", this.state.form_fullname);
        formdata.append("email", this.state.form_email);
        formdata.append("age", this.state.form_age);
        formdata.append("gender", this.state.form_gender);
        formdata.append("continent", this.state.form_continent);
        formdata.append("country", this.state.form_country);
        formdata.append("password", this.state.form_password);
        const response = await post('users/signup', formdata)
        if (response.isRegistered) {

            showMessage({
                message: response.message,
                type: "success",
                position: 'center',
                icon: 'success'
            });

            await this.storeData(response.user)
            NativeModules.DevSettings.reload()

        } else {
            showMessage({
                message: response.message,
                type: "danger",
                position: 'center',
                icon: 'danger'
            });
        }

    }


    render() {



        return (

            <View style={styles.container}>



                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* RegisterationForm */}


                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.RegisterTitle}>Register</Text>


                        {/* <TouchableOpacity onPress={() => this.RBSheet.open()} style={{ borderColor: '#36413d', backgroundColor: '#36413d', borderRadius: 100, justifyContent: 'center', alignItems: 'center', width: 70, height: 70, marginTop: 20 }}>
                            <Icon name='user' color='white' size={50} />
                        </TouchableOpacity> */}

                    </View>



                    <View style={styles.RegistrationFormContainer}>




                        <TextInput placeholder='Full Name'
                            onChangeText={(text) => { this.setState({ form_fullname: text }) }}
                            style={styles.RegistrationFormTextField}
                            value={this.state.form_fullname}
                            placeholderTextColor="white"
                        />

                        <TextInput
                            onChangeText={(text) => { this.setState({ form_email: text }) }}
                            placeholder='Email'
                            style={styles.RegistrationFormTextField}
                            placeholderTextColor="white"
                            value={this.state.form_email}
                        />

                        <TextInput
                            onChangeText={(text) => { this.setState({ form_password: text }) }}
                            secureTextEntry
                            placeholder='Password'
                            value={this.state.form_password}
                            style={styles.RegistrationFormTextField}
                            placeholderTextColor="white"
                        />
                        <TextInput
                            onChangeText={(text) => { this.setState({ form_age: text }) }}
                            placeholder='Enter your age'
                            value={this.state.form_age}
                            style={styles.RegistrationFormTextField}
                            placeholderTextColor="white"
                        />

                        {/* Gender */}
                        <View style={{ marginTop: 20 }}>
                            <DropDownPicker
                                items={[
                                    { label: 'Female', value: 'Female', },
                                    { label: 'Male', value: 'Male', },


                                ]}
                                placeholder='Gender'
                                placeholderStyle={{ color: 'white' }}
                                containerStyle={{ height: 50, }}
                                style={{ backgroundColor: '#36413d', borderColor: '#36413d' }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                onChangeItem={(item) => { this.setState({ form_gender: item.value }) }}
                                dropDownStyle={{ backgroundColor: '#36413d' }}

                            />
                        </View>
                        {/* End Gender */}

                        {/* Continents */}
                        <View style={{ marginTop: 20 }}>
                            <DropDownPicker
                                items={this.state.continents}
                                onChangeItem={(item) => { this.setState({ form_continent: item.value }) }}
                                placeholder='Select Your Continent'
                                placeholderStyle={{ color: 'white' }}
                                containerStyle={{ height: 50, }}

                                style={{ backgroundColor: '#36413d', borderColor: '#36413d' }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#36413d' }}

                            />
                        </View>
                        {/* End Continents */}



                        {/* Country */}



                        <View style={{ marginTop: 20 }}>
                            <DropDownPicker
                                items={this.state.countries}
                                onChangeItem={(item) => { this.setState({ form_country: item.value }) }}
                                placeholder='Select Your Country'
                                placeholderStyle={{ color: 'white' }}
                                containerStyle={{ height: 50, }}
                                style={{ backgroundColor: '#36413d', borderColor: '#36413d' }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#36413d' }}

                            />

                        </View>
                        {/* End Country */}

                        <View style={{ alignItems: 'center', justifyContent: 'center' }} style={{
                            borderWidth: 1,
                            borderColor: '#60AA6D',
                            width: '90%',
                            marginTop: 50,
                            borderRadius: 30,
                            padding: 10,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#60AA6D',
                            left: 10
                        }} activeOpacity={0.8} >

                            <TouchableOpacity onPress={() => this.initiateRegisteration()}>
                                <Text style={{ fontSize: 20, color: 'white' }} >Register</Text>
                            </TouchableOpacity>

                        </View>


                    </View>
                    {/* End RegisterationForm */}

                    <FlashMessage position="top" />

                </ScrollView>








                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={180}
                    openDuration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: '#36413d',
                        }
                    }}
                >
                    <TouchableOpacity style={{
                        borderWidth: 1,
                        borderColor: '#60AA6D',
                        width: '90%',
                        marginTop: 15,
                        borderRadius: 30,
                        padding: 10,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#60AA6D',

                    }} activeOpacity={0.8} >
                        <Text style={styles.getStartedText}>Pick From Library</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        borderWidth: 1,
                        borderColor: '#60AA6D',
                        width: '90%',
                        marginTop: 20,
                        borderRadius: 30,
                        padding: 10,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#60AA6D',

                    }} activeOpacity={0.8} >
                        <Text style={styles.getStartedText}>Camera</Text>
                    </TouchableOpacity>

                </RBSheet>


            </View>

        )
    }
}

export default Register