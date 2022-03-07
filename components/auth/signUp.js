import React, {useContext} from 'react'
import {
  View, TextInput, Button, StyleSheet, Text, ToastAndroid
} from 'react-native'
import {signUp} from '../../API/Auth.js'
import {signIn} from '../../API/Auth.js'
import {connect, useDispatch} from 'react-redux'

function SignUp(props){ //INSCRIPTION

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
          if(data.message === "User was registered successfully!"){
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            signIn(email, password).then(data => {
              dispatch({ type: "SET_API_TOKEN", value: data.accessToken })
              dispatch({ type: "SET_USER_ID", value: data.id })
              dispatch({ type: "SET_USER_NAME", value: data.name})
              dispatch({ type: "SET_USER_SURNAME", value: data.surname})
              dispatch({ type: "SET_USER_EMAIL", value: data.email})
            })
          }else{
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
          }
        })
      }
    }


      return(
        <View style={styles.main_container}>
          <View style={styles.form}>
            <Text style={styles.title}>
              Créez votre cuisine !
            </Text>
            <TextInput
              placeholder='Prénom'
              style={styles.input}
              onChangeText={(text) => _usernameChanged(text)}
            />
            <TextInput
              placeholder='Nom'
              style={styles.input}
              onChangeText={(text) => _surnameChanged(text)}
            />
            <TextInput
              placeholder='Adresse email'
              autoComplete='email'
              keyboardType='email-address'
              style={styles.input}
              onChangeText={(text) => _emailChanged(text)}
            />
            <TextInput
              placeholder='Mot de passe'
              secureTextEntry={true}
              style={styles.input}
              onChangeText={(text) => _passwordChanged(text)}
            />
            <Button
              title="S'inscrire"
              style={styles.button}
              onPress={() => _sendSignUpRequest()}
            />
          </View>
        </View>
      )
}
const mapStateToProps = (state) => {
  return {
    api_token: state.setApiToken.api_token,
    user_id: state.setApiToken.user_id,
    user_name : state.setApiToken.user_name,
    user_surname : state.setApiToken.user_surname,
    user_email : state.setApiToken.user_email
  }
}

export default connect(mapStateToProps)(SignUp)

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    padding: 10
  },
  form: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30
  },
  input: {
    width:250,
    borderBottomColor: '#00000030',
    borderBottomWidth: 1,
    padding: 5,
    marginTop: 30,
    marginBottom: 20
  },
  button: {
    marginTop: 50
  }
});
