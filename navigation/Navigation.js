import React from 'react'
import {StyleSheet, Image} from 'react-native'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import AuthLoading from '../components/auth/authLoading.js'
import SignIn from '../components/auth/signIn.js'
import SignUp from '../components/auth/signUp.js'
import Accueil from '../components/auth/accueil.js'
import Home from '../components/home.js'
import InventaireList from '../components/inventaire/inventaireList.js'
import Inventaire from '../components/inventaire/inventaire.js'

const DrawerNavigator = createDrawerNavigator({
  Home :{
    screen:Home,
    navigationOptions:{
      title: 'Accueil',
      headerLeft: null
    }
  }
})

const HomeStackNavigator = createStackNavigator({
  Home :{
    screen:Home,
    navigationOptions:{
      title: 'Accueil'
    }
  }// Ici il y aura en théorie le lien vers les recettes cliquées
})

const InventaireListStackNavigator = createStackNavigator({
  InventaireList:{
    screen: InventaireList,
    navigationOptions:{
      title: "Frigoto"
    }
  },
  Inventaire:{
    screen: Inventaire
  }
})

const BottomTabNavigator = createBottomTabNavigator({
  Home : {
    screen : HomeStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../assets/ic_search.png')}
          style={styles.icon}/>
      }
    }
  },
  InventaireList: {
    screen: InventaireListStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../assets/ic_favorite.png')}
          style={styles.icon}/>
      }
    }
  },

},
{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true
  }
}
)

const SignInStackNavigator = createStackNavigator({
  SignIn:{
    screen: SignIn,
    navigationOptions:{
      title: "Se connecter"
    }
  },
  SignUp:{
    screen: SignUp
  }
},
  {
    headerMode: 'none'
  }
)

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: BottomTabNavigator,
    Auth: SignInStackNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(SwitchNavigator)
