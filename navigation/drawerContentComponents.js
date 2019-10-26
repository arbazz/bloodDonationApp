import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import {AsyncStorage} from 'react-native';

var data;

class drawerContentComponents extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

   async componentDidMount(){
        const value = await AsyncStorage.getItem('token')
        if(value === null){
            this.props.navigation.navigate("Login")
        }
    }
    handleSignout=async()=>{
        const value = await AsyncStorage.removeItem('token');
        console.log(value)
        if(value === null){
            this.componentDidMount()
        }
    //    if(res === true){
    //        Alert("Success")
    //        this.props.navigation.navigate('Login')
    //    }
    }
    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
   
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
             
             {/* <Image style={styles.image} source={""} /> */}
            </View>

            <View>
                <Text style={styles.text}>
                    {/* {Profile[0].displayName} */}
                </Text>
            </View>
                <TouchableOpacity style={styles.otherView}>
                <Icon name="home" color='grey' size={35} style={styles.Icon}/>
                    <Text style={{color: 'grey'}}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherView} >
                <Icon name="devices" color='grey' size={35} style={styles.Icon}/>
                    <Text style={{color: 'grey'}}>My Devices</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherView}  onPress={()=>this.props.navigation.navigate('PostRequirement')}>
                <Icon name="history" color='grey' size={35} style={styles.Icon}/>
                    <Text style={{color: 'grey'}}>Post Requirement</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherView} onPress={()=>{this.props.navigation.navigate("UserPost");}}>
                <Icon name="play-for-work" color='grey' size={35} style={styles.Icon}/>
                    <Text style={{color: 'grey'}}>My posts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutView} onPress={this.handleSignout}>
                    <Text style={{color: 'white'}}>Logout</Text>
                </TouchableOpacity>
                
            {/* <View style={styles.screenContainer}>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='ScreenA') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ScreenA') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('ScreenA')}>Screen A</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='ScreenB') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ScreenB') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('ScreenB')}>Screen B</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='ScreenC') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ScreenC') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('ScreenC')}>Screen C</Text>
                </View>
            </View> */}
        </View>
    )
  }
}

const mapStateToProps=(state)=> {
    const {Profile} = state;
    data = Profile
    // console.log("dta gerer radskadjsioadjsiadj=======================>", Profile.data.providerData)
    return state 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    screenContainer: { 
        paddingTop: 20,
        width: '100%',
    },
    text: {
        marginTop: 10,
        fontSize: 18
    },
   image:{ 
       width: 150, 
       height: 150,  
       marginTop: 10
    },
    profileContainer:{
     
    },
    logoutView:{
        marginTop: 10,
        backgroundColor: 'black',
        width: '50%',
        height: 40,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    otherView:{
        marginTop: 10,
        width: '50%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        borderColor: 'grey',
        borderTopWidth: 1,
    },
    icon:{
        alignItems: 'center',
        alignContent: 'center',
    }
});


export default drawerContentComponents