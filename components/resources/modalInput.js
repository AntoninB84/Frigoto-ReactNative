import React from 'react'
import {Modal, View, TextInput, Text, StyleSheet, TouchableOpacity, Button} from 'react-native'

export function ModaleInput(props){

  const [texte, setTexte] = React.useState()

  React.useEffect(() => {
    setTexte(props.value)
  },[props.value])

  const _texteInput = (input) => {
    setTexte(input)
  }

  return (

      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
            props.closeModale()
        }}
      >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                value={texte}
                autoFocus={true}
                onChangeText={(input) => _texteInput(input)}
              />
              <Button
                title='Valider'
                style={styles.button}
                onPress={() => props.onValidate(texte)}
              />
            </View>
          </View>
      </Modal>
  );

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "lightgrey",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
