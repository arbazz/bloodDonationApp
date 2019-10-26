import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Picker, Image, KeyboardAvoidingView, ActivityIndicator, Alert} from 'react-native';
import * as Font from 'expo-font';
import { AsyncStorage } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import styles from './style'

const dataArray = [
  { title: "Blood Group", content: "Lorem ipsum dolor sit amet" },
];


export default class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      login: true,
      create_account: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      bloodGroup: "please select",
      isReady: false,
      loading: false
    }
  }
  async componentDidMount() {
    this._isMounted = true;
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        this.props.navigation.navigate('Home')

        console.log(value);

      } else {

      }
    } catch (error) {
      // Error retrieving data
    }

  }



  handleSubmitSignUp = async () => {
    this.setState({loading: true})
    console.log("working")
    const { email, password, firstName, lastName, bloodGroup } = this.state
    if (this._isMounted) {
  
    const rawResponse = await fetch('https://arbaz2.herokuapp.com/users/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        bloodGroup
      })
    });
    const content = await rawResponse.json();

    console.log(content.message);
    
    if (content.message === "User registered successfully!") {
      Alert.alert(
        'Success',
        'Registered',
        [
          {text: '', onPress: () => console.log('Ask me later pressed')},
          {
            text: '',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
      
      this.props.navigation.navigate('Login')
    }else{
      this.setState({loading: false})
      Alert.alert(
        'Regsitration Failed',
        'Please Try Again',
        [
          {text: '', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
      
      
    }
  }
  }
  componentWillUnmount(){
    this._isMounted = false;
  }

  

  render() {
    const { email, password, firstName, lastName, loading } = this.state
    return (
      <KeyboardAvoidingView style={[styles.container]} behavior="padding" enabled>
        {!!loading && <View style={[styles.container, styles.horizontal]} >
          <ActivityIndicator size="large" color="white" />
          <Text>Login in...</Text>
        </View>}
        {!!!loading && <View>
          <Image source={require('../../assets/blood-drop.png')} style={styles.image} />
        </View>}
        {!!!loading && <View style={styles.loginTextView}>
          <Text style={styles.loginText}>New Account</Text>
        </View>}
        {!!!loading && <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="First name"
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ firstName: text })}
          />
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Last name"
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ lastName: text })}
          />
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ email: text })}
          />
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ password: text })}
          />
          <Picker
            selectedValue={this.state.bloodGroup}
            style={styles.pickerContainer}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ bloodGroup: itemValue })
            }>
            <Picker.Item color="white" style={styles.pickerLabel} label="Please select blood Group" value="Please select blood Group" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
          </Picker>
        </View>}

       {!!!loading && <TouchableOpacity style={styles.buttonView} onPress={this.handleSubmitSignUp}>
          <Text style={styles.textColor} > Register </Text>
        </TouchableOpacity>}
        {!!!loading &&  <View style={styles.signUpView}>
          <Text style={styles.signText}>
            Not the first time?
          </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.signupButton}>
            <Text style={styles.textColor}>Login.</Text>
          </TouchableOpacity>
        </View>}

      </KeyboardAvoidingView>
    )

  }

}