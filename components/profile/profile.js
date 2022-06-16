import React, {useContext, useState} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux'
import { View, Text, Button, StyleSheet, Modal, ImageBackground, TouchableOpacity, ToastAndroid } from 'react-native'
import Header from '../resources/header';

import { deleteAccount } from '../../API/Auth.js'

function Profile(props) {

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
              <Text style={{marginBottom: 30,textAlign: 'center', fontSize: 15}}>Etes-vous certains de vouloir supprimer votre compte ?</Text>
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
        <View style={{ flex: 1 }}>
            <Header navigation={props.navigation} />
            {deleteAccountModal()}
            <ImageBackground
                source={require('../../assets/profil.png')}
                resizeMode='cover'

                style={styles.backgroundImage}>
                <View style={styles.rotate}>
                    <Text style={styles.titre}>{props.user_name}</Text>
                    <Text style={styles.sousTitre}>{props.user_email}</Text>


                    <View style={{ flex: 1, justifyContent: 'space-evenly', paddingBottom: 50 }}>
                        <View style={styles.center}>
                            <TouchableOpacity style={styles.button1} onPress={() => _deleteAccount()}>
                                <Text style={styles.button1Style} >Supprimer mon compte</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.center}>
                            <TouchableOpacity style={styles.button2} onPress={() => _disconnect()}>
                                <Text style={styles.button2Style} >Se déconnecter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )

}

const styles = StyleSheet.create({
    center: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    rotate: {
        flex: 1,
        transform: [{rotate: '-8deg'}],
        paddingLeft: 10,
    },
    titre: {
        marginTop: 150,
        fontSize: 35,
        textAlign: 'center',
        fontFamily: 'Maiandra GD',
        padding: 15,
        paddingBottom: 0,
        color: "#393738"
    },
    backgroundImage: {
        flex: 1,
    },
    sousTitre: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Maiandra GD',
        padding: 15,
        color: "#393738"
    },
    button1: {
        width: 300,
        padding: 18,
        backgroundColor: '#FFFFFF',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#FF5757',
        marginBottom: 20,
    },
    button1Style: {
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 17,
        color: '#FF5757',
    },
    button2: {
        width: 300,
        padding: 18,
        backgroundColor: '#FF5757',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#FF5757',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    button2Style: {
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 17,
        color: 'white',
    },
  centeredView: {
    flex: 1,
    padding: 35,
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
    elevation: 10,
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
        user_name: state.setApiToken.user_name,
        user_surname: state.setApiToken.user_surname,
        user_email: state.setApiToken.user_email
    }
}

export default connect(mapStateToProps)(Profile)
