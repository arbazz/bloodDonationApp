import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, ScrollView,Alert, AsyncStorage } from 'react-native';
import { Content, Item, Input, Form, Picker, Button, Label, Text, Header, View } from 'native-base';
import * as Font from 'expo-font';
// import sendPushNotification from './push'

export default class PostBlood extends Component {
    constructor() {
        super();
        this.state = {
            bloodGroup: "",
            urgent: "",
            country: "",
            isReady: false,
            instruction: '',
            contact: '',
            relation: '',
            contact: '',
            state: '',
            hospital: '',
            units: '',
            city: ''
        }
    }

    handleChange = async() => {
        
    }

async componentWillMount(){
    const token = await AsyncStorage.getItem("token")
    this.setState({token})
    await Font.loadAsync({
        Roboto: require('../../node_modules/native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('../../node_modules/native-base/Fonts/Roboto_medium.ttf')
    });

    this.setState({ isReady: true });
}
    hadleValueChange = ( name, value) =>{
        this.setState({[name]: value})
    }

    handleOnPress=async()=>{

        console.log("working")
        const {bloodGroup, urgent, country, instruction, contact, relation, state,hospital, units, city} = this.state;
        const rawResponse = await fetch('https://arbaz2.herokuapp.com/posts/addPost', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `bearer ${this.state.token}` 
            },
            body: JSON.stringify({
               bloodGroup,
               urgent, 
               instruction,
               country,
               relation,
               state,
               contact,
               hospital,
               units,
               city

            })
          });
          const content = await rawResponse.json();
          console.log(content)
          if(content.message === "post added successfully"){
            const toks = await fetch('https://arbaz2.herokuapp.com/users/getPushToken', {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
              });
              const tokks = await toks.json();
              console.log("content.post", tokks)
              for(x of tokks){
                if(x){

                    const res = await fetch('https://exp.host/--/api/v2/push/send', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            to: x,
                            sound: 'default',
                            title: 'blood Requird',
                            body: 'please donate blood'
                        })
                    });
                }
                }
              
            Alert.alert(
                'Success',
                'Uploaded',
                [
                  {text: '', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
                this.props.navigation.navigate("Home")
          }
          
    }

    render() {
        if (!this.state.isReady) {
            return (<View/>);
        }
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <ScrollView>
                    <Header />
                    <Form style={styles.form}>
                        <Label style={styles.label}>Blood Group</Label>
                        <Item regular>
                            <Picker
                                selectedValue={this.state.bloodGroup}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.hadleValueChange("bloodGroup", itemValue)
                                }
                            >
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                            </Picker>
                        </Item>
                        <Label style={styles.label}>No. of Blood Required</Label>
                        <Item regular>
                            <Picker
                                selectedValue={this.state.units}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.hadleValueChange("units", itemValue)
                                }

                            >
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5" value="5" />
                            </Picker>
                        </Item>
                        <Label style={styles.label}>Urgency</Label>
                        <Item regular>
                            <Picker
                                selectedValue={this.state.urgent}

                                onValueChange={(itemValue, itemIndex) =>
                                    this.hadleValueChange("urgent", itemValue)
                                }
                            >
                                <Picker.Item label="Urgent" value="Urgent" />
                                <Picker.Item label="Within 5 hours" value="Within 5 hours" />
                                <Picker.Item label="Within 12 hours" value="Within 12 hours" />
                                <Picker.Item label="Within 24 hours" value="Within 24 hours" />
                                <Picker.Item label="Within 2 days" value="Within 2 days" />
                                <Picker.Item label="Within 2 days" value="Within 2 days" />
                                <Picker.Item label="Within 2 days" value="Within 2 days" />
                                <Picker.Item label="Within Week" value="Within Week" />
                            </Picker>
                        </Item>
                        <Label style={styles.label}>Country</Label>
                        <Item regular>
                            <Picker
                                selectedValue={this.state.country}

                                onValueChange={(itemValue, itemIndex) =>
                                    this.hadleValueChange("country", itemValue)
                                }
                            >
                                <Picker.Item label="Pakistan" value="Pakistan" />
                                <Picker.Item label="India" value="India" />
                                <Picker.Item label="Bangladash" value="Bangladash" />
                            </Picker>
                        </Item>
                        <Label style={styles.label}>State</Label>
                        <Item regular>
                            <Picker
                                selectedValue={this.state.state}

                                onValueChange={(itemValue, itemIndex) =>
                                    this.hadleValueChange("state", itemValue)
                                }
                            >
                                <Picker.Item label="Sindh" value="Sindh" />
                                <Picker.Item label="Punjab" value="Punjab" />
                                <Picker.Item label="KPK" value="KPK" />
                                <Picker.Item label="Balochistan" value="Balochistan" />
                                <Picker.Item label="Gilgit Baltistan" value="Gilgit Baltistan" />
                            </Picker>
                        </Item>
            
                        <Label style={styles.label}>City</Label>
                        <Item regular>
                            <Picker
                                selectedValue={this.state.city}

                                onValueChange={(itemValue, itemIndex) =>
                                    this.hadleValueChange("city", itemValue)
                                }
                            >
                                <Picker.Item label="Islamabad" value="Islamabad" />
                                <Picker.Item label="Karachi" value="Karachi" />
                                <Picker.Item label="Skardu" value="Skardu" />
                                <Picker.Item label="Rawalpindi" value="Rawalpindi" />
                                <Picker.Item label="Gilgit" value="Gilgit" />
                            </Picker>
                        </Item>
                        <Label style={styles.label}>Hospital</Label>
                        <Item regular>
                            <Picker
                                selectedValue={this.state.hospital}

                                onValueChange={(itemValue, itemIndex) =>
                                    this.hadleValueChange("hospital", itemValue)
                                }
                            >
                                <Picker.Item label="Indus Hospital" value="Indus Hospital" />
                                <Picker.Item label="Ziauddin Hospital" value="Ziauddin Hospital" />
                                <Picker.Item label="Agha Khan Hospital" value="Agha Khan Hospital" />
                                <Picker.Item label="Liaquat National Hospital" value="Liaquat National Hospital" />
                                <Picker.Item label="OMI" value="OMI" />
                                <Picker.Item label="Jinnah Hospital" value="Jinnah Hospital" />
                                <Picker.Item label="Holy Family Hospital" value="Holy Family Hospital" />
                            </Picker>
                        </Item>
                        <Label style={styles.label}>Your relation with Patient</Label>
                        <Item regular>
                            <Picker
                                selectedValue={this.state.relation}

                                onValueChange={(itemValue, itemIndex) =>
                                    this.hadleValueChange("relation", itemValue)
                                }
                            >
                                <Picker.Item label="Father" value="Father" />
                                <Picker.Item label="Mother" value="Mother" />
                                <Picker.Item label="Son" value="Son" />
                                <Picker.Item label="Daughter" value="Daughter" />
                                <Picker.Item label="Aunt" value="Aunt" />
                                <Picker.Item label="Uncle" value="Uncle" />
                                <Picker.Item label="Nephew" value="Nephew" />
                                <Picker.Item label="Niece" value="Niece" />
                                <Picker.Item label="Friend" value="Friend" />
                                <Picker.Item label="Neighbour" value="Neighbour" />
                                <Picker.Item label="None" value="None" />
                            </Picker>
                        </Item>
                        <Label style={styles.label}>Contact No</Label>
                        <Item regular>
                            <Input textContentType="telephoneNumber" placeholder="Contact No" onChangeText={(text)=>{this.setState({contact: text})}} />
                        </Item>
                        <Label style={styles.label}>Additional Instruction</Label>
                        <Item regular>
                            <Input multiline numberOfLines={4} placeholder="Additional Instruction ..." onChangeText={(text)=>{this.setState({instruction: text})}}/>
                        </Item>
                    </Form>
                    <View style={styles.postBtn}>
                        <Button onPress={this.handleOnPress} block primary>
                            <Text>Post</Text>
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    form: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    label: {
        marginTop: 15,
        marginBottom: 5,
    },
    postBtn: {
        marginHorizontal: 20,
        marginVertical: 10
    }
})