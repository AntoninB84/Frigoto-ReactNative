import React, { useContext } from 'react'
import {
  View, KeyboardAvoidingView, Keyboard, ImageBackground, Image, Dimensions, TextInput, Button, StyleSheet, Text, ToastAndroid
} from 'react-native'
import { signUp } from '../../API/Auth.js'
import { signIn } from '../../API/Auth.js'
import { connect, useDispatch } from 'react-redux'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'

function SignUp(props) { //INSCRIPTION

  const dispatch = useDispatch();
  let email = ""
  let password = ""
  let username = ""
  let surname = ""

  const _usernameChanged = (text) => {
    username = text
  }
  const _surnameChanged = (text) => {
    surname = text
  }
  const _emailChanged = (text) => {
    email = text
  }
  const _passwordChanged = (text) => {
    password = text
  }

  const _sendSignUpRequest = () => {
    if (username.length > 0 && surname.length > 0 && email.length > 0 && password.length > 0) {
      signUp(username, surname, email, password).then(data => {
        if (data.message === "User was registered successfully!") {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          signIn(email, password).then(data => {
            dispatch({ type: "SET_API_TOKEN", value: data.accessToken })
            dispatch({ type: "SET_USER_ID", value: data.id })
            dispatch({ type: "SET_USER_NAME", value: data.name })
            dispatch({ type: "SET_USER_SURNAME", value: data.surname })
            dispatch({ type: "SET_USER_EMAIL", value: data.email })
          })
        } else {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
        }
      })
    }
  }


  return (
    <View style={styles.main_container}>
      <ImageBackground
        source={require('../../assets/Photo_Accueil.png')}
        resizeMode='cover'
        style={styles.backgroundImage}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Frigoto</Text>
        </View>
        <KeyboardAvoidingView
          behavior="height"
          style={styles.main_container}>
          <View style={styles.form}>
          <TouchableWithoutFeedback style={styles.main_container} onPress={Keyboard.dismiss}>
            <View style={[styles.center, styles.column]}>
              <Image
                source={require("../../assets/frigoto.png")}
                style={styles.logo}
              />
              <Text style={styles.title}>Frigoto</Text>
            </View>
            <View style={styles.form}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300 }}>
                <View style={styles.inputRow}>
                  <TextInput
                    placeholderTextColor="#FF5757"
                    placeholder='Prénom'
                    style={styles.input2}
                    onChangeText={(text) => _usernameChanged(text)}
                  />
                </View>
                <View style={styles.inputRow}>
                  <TextInput
                    placeholderTextColor="#FF5757"
                    placeholder='Nom'
                    style={styles.input2}
                    onChangeText={(text) => _surnameChanged(text)}
                  />
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.inputContainer}>
                  <Image
                    source={require('../../assets/mail.png')}
                    style={styles.inputImage}
                    resizeMode='contain' />
                  <TextInput
                    placeholderTextColor="#FF5757"
                    placeholder='Adresse email'
                    autoComplete='email'
                    keyboardType='email-address'
                    style={styles.input}
                    onChangeText={(text) => _emailChanged(text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Image
                    source={require('../../assets/key.png')}
                    style={styles.inputImage}
                    resizeMode='contain' />
                  <TextInput
                    placeholderTextColor="#FF5757"
                    placeholder='Mot de passe'
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={(text) => _passwordChanged(text)}
                  />
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => _sendSignUpRequest()}>
                  <Text style={styles.signUp}>Créer votre compte</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
          </View>

        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  )
}
const mapStateToProps = (state) => {
  return {
    api_token: state.setApiToken.api_token,
    user_id: state.setApiToken.user_id,
    user_name: state.setApiToken.user_name,
    user_surname: state.setApiToken.user_surname,
    user_email: state.setApiToken.user_email
  }
}

export default connect(mapStateToProps)(SignUp)

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    padding: 10
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  center: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    flexDirection: "column"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#df4c4c",
    paddingVertical: 5,
    paddingHorizontal: 15,
    height: 50,
  },
  headerTitle: {
    fontSize: 20,
    textTransform: "uppercase",
    fontFamily: 'Maiandra GD',
    letterSpacing: 5,
    color: 'white',
  },
  form: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#FF5757',
    fontFamily: 'Maiandra GD',
    fontSize: 50,
  },
  inputContainer: {
    width: 300,
    textAlign: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#FF5757',
    marginBottom: 10,
    flexDirection: 'row',
  },
  inputRow: {
    width: 140,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#FF5757',
    marginBottom: 10,
    flexDirection: 'row',
  },
  input: {
    width: "65%",
    padding: 18,
    color: '#FF5757',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium'
  },
  input2: {
    width: "100%",
    padding: 18,
    color: '#FF5757',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium'
  },
  inputImage: {
    aspectRatio: 1,
    width: 40,
  },
  button: {
    width: 250,
    padding: 15,
    backgroundColor: '#FF5757',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#FF5757',
  },
  signUp: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 17,
    color: 'white',
  }
});
