import React from 'react';
import { ScrollView, View, Text, AsyncStorage, TouchableNativeFeedback, Alert } from 'react-native'
import Styles from './Styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      content: ''
    }
  }
  async registerForPushNotificationsAsync(token) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let pushToken = await Notifications.getExpoPushTokenAsync();
    // console.log(pushToken.ExponentPushToken[0])
    // POST the token to your backend server from where you can retrieve it to send push notifications.
   return await fetch('https://arbaz2.herokuapp.com/users/addPushToken', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
        body: JSON.stringify({
          pushToken: pushToken
        })
      });
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem("token")
    // console.log(token)
    if (token != null) {

      const rawResponse = await fetch('https://arbaz2.herokuapp.com/posts/getAll', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
      });
      const content = await rawResponse.json();
      console.log("content.post", content)
      if (content.post.length) {
        this.setState({
          content
        })
      }
      if(Constants.isDevice)
      this.registerForPushNotificationsAsync(token);      
    

      
    }
  }
  async handleVolunteer(item) {
    console.log(item)


    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      const rawResponse = await fetch('https://arbaz2.herokuapp.com/posts/addVolunteer', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
        body: JSON.stringify({
          docId: item._id

        })
      });
      const content = await rawResponse.json();
      console.log(content)
      if (content.message === "post added successfully") {
        Alert.alert(
          'Success',
          'you are now a volunteer',
          [
            { text: '', onPress: () => console.log('Ask me later pressed') },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      }else if(content.message === "already been volunteer"){
        Alert.alert(
          'Volunteer',
          'you are already a volunteer',
          [
            { text: '', onPress: () => console.log('Ask me later pressed') },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      }
    }
  }

  render() {
    // if (this.state.content.post.length) {
    //   console.log(this.state.content)
    // }
    return (
      <ScrollView style={Styles.container}>
        {!!this.state.content.post && this.state.content.post.map((item) => {
          return (
            <View style={Styles.viewContainer} key={item._id}>
              <TouchableNativeFeedback onPress={() => this.props.navigation.navigate("Details", { data: item })}>
                <View>
                  <Text style={Styles.name}>{item.userName}</Text>
                  <Text style={Styles.required}> {item.units} units of: {item.bloodGroup} positive blood required at {item.hospital} for my {item.relation}</Text>
                  <View style={Styles.seprator} />
                  <Text style={Styles.otherText}>Contact At: {item.contact}</Text>
                  <Text style={Styles.otherText}>Relation:  {item.relation}</Text>
                  <Text style={Styles.otherText}>Additional: {item.information}</Text>
                  <Text style={Styles.otherText}>country: {item.country}</Text>
                  <Text style={Styles.otherText}>{item.instruction}</Text>
                  <Text style={Styles.otherText}>Volunteer Uptlill Now: 5</Text>
                  <Text style={Styles.otherText}>Current Requirment: 2</Text>
                </View>
              </TouchableNativeFeedback>
              <View style={Styles.seprator} />

              <View style={Styles.row}>
                <TouchableOpacity style={Styles.vol} onPress={() => { this.handleVolunteer(item) }}>
                  <Text style={Styles.textButton}>Volunteer</Text>
                </TouchableOpacity >
                <TouchableOpacity style={Styles.com} onPress={() => this.props.navigation.navigate("Details", { data: item })}>
                  <Text style={Styles.textButton}>Comment</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </ScrollView>
    )
  }
}