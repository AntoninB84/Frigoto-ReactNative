import {connect, useSelector, useDispatch} from 'react-redux'
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, ToastAndroid, TextInput, FlatList, BackHandler, Alert} from 'react-native';
import SignIn from './auth/signIn'
import {deleteAccount} from '../API/Auth.js'
import {createInventaire, getInventaires} from '../API/Inventaire.js'

import DetectionManager from "./objectDetection/objectDetection"

function Home(props){

  const dispatch = useDispatch()

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

  const _disconnect = () => {
    const action = { type: "RESET", value: "" }
    dispatch(action)
  }

  const _deleteAccount = () => {
    deleteAccount(props.user_id, props.api_token).then(data => {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      _disconnect()
    })
  }

  const _detect = () => {
    return DetectionManager.initiateDetection();
  }

    return(
      <View style={styles.container}>
        <Text>Bienvenue {props.user_name}</Text>
        <Button
          title='Se déconnecter'
          style={styles.button}
          onPress={() => _disconnect()}
        />
        <Button
          title='Supprimer mon compte'
          style={styles.button}
          onPress={() => _deleteAccount()}
        />

        <Button
          title='Test detection'
          style={styles.button}
          onPress={() => _detect()}
        />
      </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
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
