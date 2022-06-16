import React from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { View, Text, Button, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import Header from '../resources/header';

import { deleteAccount } from '../../API/Auth.js'

function Profile(props) {

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
        <View style={{ flex: 1 }}>
            <Header navigation={props.navigation} />

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
    }
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