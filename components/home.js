import {connect} from 'react-redux'
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, ToastAndroid, TextInput, FlatList, BackHandler, Alert} from 'react-native';
import Header from './resources/header';

function Home(props){

  useEffect(() => {
    if(props.api_token  === ""){
      props.navigation.navigate('Auth')
    }
  }, [props.api_token]);

  /*const backAction = () => {
    Alert.alert("Quitter l'application", "Voulez-vous quitter l'application?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);*/

  
    return(
      <View style={styles.container}>
        <Header navigation={props.navigation}/>
        <Text>Bienvenue {props.user_name}</Text>
      </View>
    )

}

const styles = StyleSheet.create({
  container: {
  },
  listeItem: {
    fontSize: 15,
    marginTop: 10,
  }
});

const mapStateToProps = (state) => {
  return {
    api_token: state.setApiToken.api_token,
    user_id: state.setApiToken.user_id,
    user_name : state.setApiToken.user_name,
    user_surname : state.setApiToken.user_surname,
    user_email : state.setApiToken.user_email
  }
}

export default connect(mapStateToProps)(Home)
