import {connect, useSelector, useDispatch} from 'react-redux'
import React, {useContext, useState} from 'react';
import { StyleSheet, Text, View, Button, ToastAndroid, TextInput, FlatList, TouchableWithoutFeedback} from 'react-native';
import {getProduits} from '../../API/Produits.js'

function Inventaire(props){

  const {navigation} = props
  const dispatch = useDispatch()
  const [listeProduits, setListeProduits] = useState([{"id":0, "nom":""}])
  const inventaireId = navigation.getParam('inventaireId', 'NO-ID')
  const nomInventaire = navigation.getParam('nomInventaire', 'NO-ID')

  const navigationOptions = {
    title : nomInventaire,
  }

  React.useEffect(() => {
    _loadProduits()
  }, [])


  const _loadProduits = () => {
    getProduits(inventaireId, props.api_token).then(data => {
      setListeProduits(data.produits)
    })
  }
    return(
      <View style={styles.container}>
        <FlatList
          data={listeProduits}
          keyExtractor={(item) => item.id}
          renderItem={({item}) =>
            <TouchableWithoutFeedback
            >
              <Text style={styles.listeItem}>{item.nom}</Text>
            </TouchableWithoutFeedback>
          }
        />
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

export default connect(mapStateToProps)(Inventaire)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listeItem: {
    fontSize: 30,
    marginTop: 20,
  }
});
