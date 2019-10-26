import React from 'react';
import { ScrollView, View, Text, AsyncStorage, TextInput, KeyboardAvoidingView, Alert } from 'react-native'
import Styles from './StylesUserPost'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'


export default class UserPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      volunteers: [],
      comment: '',
      comments: []
    }
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem("token")
    if (token != null) {
      this.setState({
        content: this.props.navigation.state.params.data
      })
      const rawResponse = await fetch('https://arbaz2.herokuapp.com/posts/getVolunteers', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
        body: JSON.stringify({
          docId: this.props.navigation.state.params.data._id
        })
      });
      const content = await rawResponse.json();
      this.setState({
        volunteers: content.vols
      })


      const comResponse = await fetch('https://arbaz2.herokuapp.com/posts/getComment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
        body: JSON.stringify({
          docId: this.props.navigation.state.params.data._id
        })
      });
      const comment = await comResponse.json();
      if (comment) {
        this.setState({
          comments: comment.comments
        })
      }
    }
  }

  handleComment = async() => {
    const token = await AsyncStorage.getItem("token")
    let { comment, comments } = this.state;
    if (comment === '') {
      Alert.alert(
        'Failed',
        'Atleast Type Something',
        [
          { text: '', onPress: () => console.log('Ask me later pressed') },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: true },
      );
    } else {
      const rawResponse = await fetch('https://arbaz2.herokuapp.com/posts/addComment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
        body: JSON.stringify({
          docId: this.props.navigation.state.params.data._id,
          comment: this.state.comment
        })
      });
      const content = await rawResponse.json();
      if(content.message === "comment added successfully"){    
        let arr = this.state.comments;
        arr.push({comment,userName: this.state.content.userName, _id: Math.random()})
        this.setState({
          comments: arr
        })
      }
      }

  }
  render() {
    // if (this.state.content.post.length) {
      //   console.log(this.state.content)
      // }
      const { content, volunteers, comments } = this.state;
      // console.log(volunteers)
      let volLength = 0;
      for(let x of volunteers){
          if(x.status === 'donated')
          volLength = 1 + volLength
        }
        console.log(content)
    return (
      <ScrollView>

        <KeyboardAvoidingView behavior="position">
          <View style={Styles.viewContainer}>
            <TouchableOpacity style={Styles.IconContainer} onPress={() => { this.props.navigation.navigate('PostRequirement'), { docId: content._id } }}>
              <Icon name="edit" color='grey' size={18} style={Styles.Icon} />
            </TouchableOpacity>
            <View style={Styles.row1}>
              <Text style={Styles.name}>{content.userName}</Text>
              <Icon name="star" color='grey' size={22} style={Styles.Icon2} />
            </View>
            <Text style={Styles.otherText}>Units Required: {content.units}</Text>
            <Text style={Styles.otherText}>Donation Recieved: {volLength}</Text>
            <Text style={Styles.otherText}>Still Required: {content.units - volLength }</Text>
            <Text style={Styles.otherText}>Location: {content.city},{content.state},{content.country}</Text>
            <Text style={Styles.otherText}>Hospital: {content.hospital}</Text>
            <Text style={Styles.otherText}>Urgency: {content.urgency} </Text>
            <Text style={Styles.otherText}>Contact At: {content.contact}</Text>
            <Text style={Styles.otherText}>Relation with patient:  {content.relation}</Text>
            <Text style={Styles.otherText}>Additional: {content.instruction}</Text>

            <View style={Styles.seprator} />



            {/* <View style={Styles.row}>
                <TouchableOpacity style={Styles.com}>
                  <Text style={Styles.textButton}>Comment</Text>
                </TouchableOpacity>
              </View>
             */}
          </View>

          <View style={Styles.VolCont}>
            <Text style={Styles.textButton}>Volunteer</Text>
          </View>

          <View style={Styles.viewContainer}>
            <TouchableOpacity style={Styles.IconContainer} onPress={() => { this.props.navigation.navigate('PostRequirement'), { docId: item._id } }}>
              <Icon name="edit" color='grey' size={18} style={Styles.Icon} />
            </TouchableOpacity>
            {!!volunteers.length && volunteers.map((e) => {
              return (
                <View key={e._id}>
                  <Text style={Styles.otherText}>{e.userName} of Volunterr: -- {e.bloodGroup}</Text>
                  <Text style={Styles.otherText}>{content.bloodGroup === e.bloodGroup ? 'donation' : 'Exchange Donation'}</Text>
                </View>
              )
            })}
          </View>

          <View style={Styles.VolCont}>
            <Text style={Styles.textButton}>comment</Text>
          </View>

          <View style={Styles.viewContainer}>
            {!!comments.length && comments.map((e) => {
              return (
                <View key={e._id}>
                  <Text style={[Styles.otherText, Styles.comm]}>{e.userName}-- {e.comment}</Text>
                </View>
              )
            })}
            <View style={Styles.row3}>
              <TextInput
                style={Styles.textInput}
                underlineColorAndroid="transparent"
                placeholder="First name"
                placeholderTextColor="grey"
                autoCapitalize="none"
                onChangeText={(text) => this.setState({ comment: text })}
              />
              <TouchableOpacity style={Styles.postContainer} onPress={this.handleComment}>
                <Text style={Styles.postText}>post</Text>
              </TouchableOpacity>
            </View>
          </View>

        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}



