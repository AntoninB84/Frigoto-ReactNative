import React, {useContext, useState} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux'
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity, ToastAndroid } from 'react-native'
import Header from '../resources/header';

import {deleteAccount} from '../../API/Auth.js'

function Profile(props){

    const dispatch = useDispatch()
    
    
    const [displayModale, setDisplayModale] = useState(false)

    const _disconnect = () => {
        const action = { type: "RESET", value: "" }
        dispatch(action)
      }
    
      const _deleteAccount = () => {
        setDisplayModale(true);
      }
      
      const deleteAccountModal = () => {
      return (
        <Modal
          visible={displayModale}
          transparent={true}
          onRequestClose={()=>{
            setDisplayModale(false)
          }}
        >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <Text>Etes-vous certains de vouloir supprimer votre compte ?</Text>
            <TouchableOpacity
              style={[styles.buttonModale]}
              onPress={() => {
                setDisplayModale(false)
                deleteAccount(props.user_id, props.api_token).then(data => {
                  ToastAndroid.show(data.message, ToastAndroid.SHORT);
                  _disconnect()
                })
              }
              }
            >
              <Text style={styles.buttonTextModale}>Supprimer mon compte</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
      )
  }


    return (
        <View>
            <Header navigation={props.navigation}/>
            {deleteAccountModal}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000088",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 30,
    paddingHorizontal: 60,
  },
  buttonModale: {
    borderRadius: 3,
    padding: 10,
    elevation: 2,
    backgroundColor: "#df4c4c",
  },
  buttonTextModale: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
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
