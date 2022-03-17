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
import AddProduct from '../components/inventaire/addProduct.js'
import Profile from '../components/profile/profile.js'

const HomeStackNavigator = createStackNavigator({
  Home :{
    screen:Home,
  },// Ici il y aura en théorie le lien vers les recettes cliquées
},{
  headerMode: 'none'
})

const InventaireStackNavigator = createStackNavigator({
  Inventaire:{
    screen: Inventaire,
  },
  AddProduct:{
    screen: AddProduct,
  }
},{
  headerMode: 'none'
})

const InventaireListStackNavigator = createStackNavigator({
  InventaireList:{
    screen: InventaireList,
  },
  Inventaire:{
    screen: InventaireStackNavigator
  }
},{
  headerMode: 'none'
})

const BottomTabNavigator = createBottomTabNavigator({
  Home : {
    screen : HomeStackNavigator,
    navigationOptions: {
      tabBarLabel: "Accueil",
      tabBarIcon: ({focused}) => {
        return <Image
          source={
             focused ? require('../assets/bottomFull/maison.png')
              : require('../assets/bottomLight/maison.png')}
          style={styles.icon}/>
      }
    }
  },
  InventaireList: {
    screen: InventaireListStackNavigator,
    navigationOptions: {
      tabBarLabel: "Inventaire",
      tabBarIcon: ({focused}) => {
        return <Image
          source={
            focused ? require('../assets/bottomFull/frigo.png')
              : require('../assets/bottomLight/frigo.png')}
          style={styles.icon}/>
      }
    }
  },
},
{
  tabBarOptions: {
    activeBackgroundColor: '#FFFFFF',
    inactiveBackgroundColor: '#FFFFFF',
    showLabel: true,
    showIcon: true,
    labelStyle : {
      color: "#bf4c4c"
    }
  },
}
)

const DrawerNavigator = createDrawerNavigator({
  Home :{
    screen:BottomTabNavigator,
    navigationOptions: {
      title: "Accueil",
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "Profil",
    }
  }
})

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
    App: DrawerNavigator,
    Auth: SignInStackNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  headerStyle:{
    backgroundColor: "red"
  },
  drawerImage:{
    backgroundColor: '#bf4c4c',
    marginTop: 25,
  }
})

export default createAppContainer(SwitchNavigator)
