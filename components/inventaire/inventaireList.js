import {connect, useSelector, useDispatch} from 'react-redux'
import React, {useState, useContext} from 'react';
import { Alert, StyleSheet, Text, View, Button, ToastAndroid, TextInput, FlatList, TouchableOpacity, Modal} from 'react-native';
import {createInventaire, getInventaires, updateInventaireNom, deleteInventaire} from '../../API/Inventaire.js'
import {ModaleInput} from '../resources/modalInput.js'

function InventaireList(props){

  const dispatch = useDispatch()
  const [nomInventaire, setNomInventaire] = useState("")
  const [listeInventaires, setListeInventaires] = useState([{"id":0, "nom":""}])
  const [selectedItem, setSelectedItem] = useState({id:null, nom:""})
  const [modalInputVisible, setModalInputVisible] = useState(false)

  React.useEffect(() => {
    _loadInventaires();
  }, [props.user_id])


  const _createInventaire = () => {
    createInventaire(props.user_id, nomInventaire, props.api_token)
    .then(data => {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      _loadInventaires()
    })
  }

  const _loadInventaires = () => {
    getInventaires(props.user_id, props.api_token).then(data => {
      setListeInventaires(data)
    })
  }

  const _updateInventaireNom = (newName) => {
    updateInventaireNom(selectedItem.id, newName, props.api_token)
    _closeModale()
    _loadInventaires()
  }

  const _listItemClick = (id, nom) => {
    props.navigation.navigate('Inventaire', {
      inventaireId: id,
      nomInventaire: nom
    })
  }

  const _listItemLongClick = (id, nom) => {
    Alert.alert(
     nom,
     "Que souhaitez-vous faire ?",
     [
       {
         text: "Supprimer",
         onPress: () => {
           deleteInventaire(id, props.api_token)
           _loadInventaires()
         }
       },
       {
          text: "Modifier",
          onPress: () => {
            setSelectedItem({id:id, nom:nom})
            setModalInputVisible(true)
          }
        },
        { text: "Annuler"
        },
     ],
     {cancelable: true}
   );
  }

  const _closeModale = () => {
    setSelectedItem({id:null, nom:""})
    setModalInputVisible(false)
  }

    return(
      <View style={styles.container}>
      <ModaleInput
        modalVisible={modalInputVisible}
        closeModale={() => _closeModale()}
        value={selectedItem.nom}
        onValidate={(newName) => _updateInventaireNom(newName)}
      />
        <TextInput
          placeholder="Creer un inventaire"
          onChangeText={(texte) => setNomInventaire(texte)}
          onSubmitEditing={() => _createInventaire()}
        ></TextInput>
        <FlatList
          data={listeInventaires}
          keyExtractor={(item) => item.id}
          renderItem={({item}) =>
            <TouchableOpacity
              onPress={() => _listItemClick(item.id, item.nom)}
              onLongPress={() => _listItemLongClick(item.id, item.nom)}
            >
              <Text style={styles.listeItem}>{item.nom}</Text>
            </TouchableOpacity>
          }
        />
      </View>
    )

}

const mapStateToProps = (state) => {
  return {
    api_token: state.setApiToken.api_token,
    user_id: state.setApiToken.user_id
  }
}

export default connect(mapStateToProps)(InventaireList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  listeItem: {
    fontSize: 30,
    margin: 10,
  }
});
