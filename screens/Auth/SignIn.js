import React from "react";
import { View, TouchableOpacity, ActivityIndicator, TextInput, Alert, Text, Image, AsyncStorage } from "react-native";
import styles from './style'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            name: 'arbaz',
            loading: true,
            email: '',
            password: ''
        }
        this.mounted = true;
    }

    async checkAuth(){
        const token = await AsyncStorage.getItem('token');
        if(token !== null){
            this.props.navigation.navigate("Home")
        }
    }
    async componentDidMount() {
        await this.checkAuth()
        if (this.mounted) {
            this.setState({
                loading: false
            })
        }
    }

    handleSubmitLogin = async () => {
        this.setState({loading: true})
        const { email, password } = this.state;
        const rawResponse = await fetch('https://arbaz2.herokuapp.com/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });
        const content = await rawResponse.json();

        console.log(content);
        if(content.message === 'User not found!'){
            this.setState({loading: false})
            Alert.alert(
                'Failed',
                'Please Type valid email and password',
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
              
              
        }
        if (content.token) {
            this.props.navigation.navigate('Home')
            await AsyncStorage.setItem('token', content.token);
        }
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    render() {
        const { loading } = this.state
        return (
            <View style={[styles.container]}>
                {!!loading && <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Login in...</Text>
                </View>}
                {!!!loading && <View>
                    <Image source={require('../../assets/blood-drop.png')} style={styles.image} />
                </View>}
                <View style={styles.loginTextView}>
                    <Text style={styles.loginText}>Login</Text>
                </View>
                {!!!loading && <View style={styles.textInputView}>
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
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        placeholder="Password"
                        placeholderTextColor="grey"
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                </View>}

                {!!!loading && <TouchableOpacity style={styles.buttonView} onPress={this.handleSubmitLogin}>
                    <Text style={styles.textColor} > Log in </Text>
                </TouchableOpacity>}
                {!!!loading && <View style={styles.signUpView}>
                    <Text style={styles.signText}>
                        First time here?
          </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')} style={styles.signupButton}><Text style={styles.textColor}>Sign up.</Text></TouchableOpacity>
                </View>}
            </View>
        );
    }
}

export default Login