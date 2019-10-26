import React from "react";
import { View, TouchableOpacity, ActivityIndicator ,TextInput, Alert, Text,Image } from "react-native";
import styles from './Style'
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements'

 class Header extends React.Component {

  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.ham} onPress={()=>{ this.props.navigation.toggleDrawer();}}>
          <Icon name="list" color='#00aced' size={40}/>
          </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Header)