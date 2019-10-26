import React from 'react';
import { ScrollView, View, Text, AsyncStorage } from 'react-native'
import Styles from './StylesUserPost'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'


export default class UserPost extends React.Component {
  constructor() {
    super();
    this.state = {
      content: ''
    }
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem("token")
    console.log(token)
    if (token != null) {

      const rawResponse = await fetch('https://arbaz2.herokuapp.com/posts/getUserPost', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
      });
      const content = await rawResponse.json();
      if (content.post.length) {
        console.log("content.post")
        this.setState({
          content
        })
      }
    }
  }

  render() {
    // if (this.state.content.post.length) {
    //   console.log(this.state.content)
    // }
    return (
      <ScrollView>
        {!!this.state.content.post && this.state.content.post.map((item) => {
          return (
            <TouchableOpacity style={Styles.viewContainer} key={item._id} onPress={()=>{this.props.navigation.navigate("MyPostDetails",{data: item})}}>
              {/* <TouchableOpacity style={Styles.IconContainer} onPress={()=>{this.props.navigation.navigate('PostRequirement'), {docId: item._id}}}>
              <Icon name="edit" color='grey' size={18} style={Styles.Icon} />
              </TouchableOpacity> */}

              <Text style={Styles.name}>{item.userName}</Text>
              <Text style={Styles.required}> {item.units} units of: {item.bloodGroup} positive blood required at {item.hospital} for my {item.relation}</Text>
              <View style={Styles.seprator} />
              
              <Text style={Styles.otherText}>Status: {item.fulfilled ? "fullfiled" : 'no fulfilled'}</Text>

             
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}


