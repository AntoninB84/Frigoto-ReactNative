import {connect, useSelector, useDispatch} from 'react-redux'
import React, {useState, useContext} from 'react';
import { Alert, StyleSheet, Text, View, Button, ToastAndroid, TextInput, FlatList, TouchableOpacity, Modal, Image} from 'react-native';
import {createInventaire, getInventaires, updateInventaireNom, deleteInventaire} from '../../API/Inventaire.js'
import {ModaleInput} from '../resources/modalInput.js'
import Header from '../resources/header.js';

function InventaireList(props){

  const dispatch = useDispatch()
  const [nomInventaire, setNomInventaire] = useState("")
  const [listeInventaires, setListeInventaires] = useState([{"id":0, "nom":""}])
  const [selectedItem, setSelectedItem] = useState({id:null, nom:""})
  const [modalInputVisible, setModalInputVisible] = useState(false)
  const [displayCreate, setDisplayCreate] = useState(true)

  React.useEffect(() => {
    _loadInventaires();
  }, [props.user_id])

  const _createInventaire = () => {
    if(nomInventaire.length > 2){
      createInventaire(props.user_id, nomInventaire, props.api_token)
      .then(data => {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        setNomInventaire("")
        _loadInventaires()
      })
    }else{
      ToastAndroid.show("Votre inventaire doit avoir plus de deux caractères.", ToastAndroid.SHORT);
    }
   
  }

  const _loadInventaires = () => {
    getInventaires(props.user_id, props.api_token).then(data => {
      setListeInventaires(data)
    })
  }

  const _updateInventaireNom = () => {
    if(nomInventaire.length > 2){
      updateInventaireNom(selectedItem.id, nomInventaire, props.api_token)
      _closeModale()
      setNomInventaire("")
      setSelectedItem({id:null, nom:""})
      setDisplayCreate(true)
      _loadInventaires()
    }else{
      ToastAndroid.show("Votre inventaire doit avoir plus de deux caractères.", ToastAndroid.SHORT);
    }
    
  }

  const _listItemClick = (id, nom) => {
    props.navigation.navigate('Inventaire', {
      inventaireId: id,
      nomInventaire: nom
    })
  }

  const _deleteInventaire = (id, nom) => {
    Alert.alert(
      nom,
      "Voulez-vous vraiment supprimer cet inventaire ?",
      [
        {
          text: "Supprimer",
          onPress: () => {
            deleteInventaire(id, props.api_token)
            setSelectedItem({id:null, nom:""})
            _loadInventaires()
          }
        },
      ],
      {cancelable: true}
    );
   }

  const _modifyInventaire = (id, nom) => {
    setSelectedItem({id:id, nom:nom})
    setNomInventaire(nom)
    setDisplayCreate(false)
  }

  const _closeModale = () => {
    setSelectedItem({id:null, nom:""})
    setModalInputVisible(false)
  }

  const _displayCreateInput = () => {
    if(displayCreate){
      return(
        <View style={styles.textInputLine}>
          <TextInput
            style={styles.inputText}
            value={nomInventaire}
            placeholder="Creer un inventaire"
            onChangeText={(texte) => setNomInventaire(texte)}
          ></TextInput>
          <TouchableOpacity
            onPress={() => _createInventaire()}
            style={styles.inputValidateContainer}
          >
            <Image 
              style={styles.inputValidateIcon}
              source={require('../../assets/loneCheck.png')}
            />
          </TouchableOpacity>
        </View>
     )
    }else{
      return(
        <View style={styles.textInputLine}>
        <TextInput
          style={styles.inputText}
          value={nomInventaire}
          onChangeText={(texte) => setNomInventaire(texte)}
        ></TextInput>
        <TouchableOpacity
          onPress={() => _updateInventaireNom()}
          style={styles.inputValidateContainer}
        >
          <Image 
            style={styles.inputValidateIcon}
            source={require('../../assets/loneCheck.png')}
          />
        </TouchableOpacity>
      </View>
      )
    }
  }


    return(
      <View style={styles.container}>
      <Header navigation={props.navigation}/>
      <ModaleInput
        modalVisible={modalInputVisible}
        closeModale={() => _closeModale()}
        value={selectedItem.nom}
        onValidate={(newName) => _updateInventaireNom(newName)}
      />
      {_displayCreateInput()}
        
        <FlatList
          data={listeInventaires}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, }} 
          ListEmptyComponent={() => {
            return (
            <Text style={styles.emptyMessage}>
              Vous n'avez aucun inventaire.
            </Text>
            )
          }}
          renderItem={({item, index}) =>
          <View style={styles.listeItem}>
            <Text 
              style={styles.listeIndex}
            >{index + 1 }</Text>
            <TouchableOpacity
              onPress={() => _listItemClick(item.id, item.nom)}
              style={styles.listeItemNameContainer}
            >
              <Text style={styles.listeItemName}>{item.nom}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => _modifyInventaire(item.id, item.nom)}
              style={styles.listeIconsContainer}
            >
              <Image 
                style={styles.listeIcons}
                source={require('../../assets/pen.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => _deleteInventaire(item.id, item.nom)}
              style={styles.listeIconsContainer}
            >
              <Image 
                style={styles.listeIcons}
                source={require('../../assets/trash.png')}
              />
            </TouchableOpacity>
          </View>
            
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
  },
  textInputLine:{
    flexDirection: 'row',
    marginTop: 10,
  },
  inputText:{
    flex: 1,
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  inputValidateContainer:{
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
    marginRight: 10,
  },
  inputValidateIcon:{
    width: 25,
    height: 25,
    tintColor: '#00000055'
  },
  listeItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  listeIndex:{
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderTopLeftRadius : 5,
    borderBottomLeftRadius: 5,
  },
  listeItemName:{
    fontSize: 15,
  },
  listeItemNameContainer:{
    flex: 1,
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  listeIconsContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
  },
  listeIcons:{
    width: 20,
    height: 20,
    tintColor: "#bf4c4c"
  },
  emptyMessage:{
    textAlign: "center",
    marginTop: '50%',
  },
});
