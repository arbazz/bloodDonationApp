import React from 'react'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SignIn from '../screens/Auth/SignIn';
import Login from '../screens/Auth/Login'
import Home from '../screens/Home/index'
import drawerContentComponents from './drawerContentComponents';
import Header from './Header'
import PostRequirement from '../screens/Post/PostRequirement'
import UserPost from '../screens/Post/UserPost'
import Details from '../screens/Post/Details'
import MyPostDetails from '../screens/Post/MyPostDetails'


const AuthStack = createStackNavigator({
  Login: {
    screen: SignIn,
    navigationOptions: {
      header: null
    }
  },
  SignIn: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  }
});

const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle:"title"
      }
    }
  },
  {
    contentComponent: drawerContentComponents
  }
)

const MainStack = createStackNavigator({
  drawer:{
    screen: Drawer,
    navigationOptions: {
      headerTitle: <Header/>
    }
  },
  PostRequirement:{
    screen: PostRequirement,
    navigationOptions: {
      header: null
    }
  },
  UserPost:{
    screen: UserPost
  },
  Details: {
    screen: Details
  },
  MyPostDetails:{
    screen: MyPostDetails
  }
});


const MainNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: MainStack
    },
    {
      initialRouteName: 'Auth',
    }
  )


)


const Navigator = createAppContainer(MainNavigator);
export default Navigator
