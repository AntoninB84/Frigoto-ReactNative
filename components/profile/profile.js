import React from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import { View, Text, Button, StyleSheet } from 'react-native'
import Header from '../resources/header';

import {deleteAccount} from '../../API/Auth.js'

function Profile(props){

    const dispatch = useDispatch()

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


    return (
        <View>
            <Header navigation={props.navigation}/>
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

        </View>
    )

}

const styles = StyleSheet.create({
    
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
  
  export default connect(mapStateToProps)(Profile)