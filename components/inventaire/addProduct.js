import {connect, useSelector, useDispatch} from 'react-redux'
import React, {useContext, useState} from 'react';
import DetectionManager from "../objectDetection/objectDetection"
import ProductList from './productList';
import { getProduitsLike, postProduits } from '../../API/Produits';
import { 
  Modal,
  Button,
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  FlatList,
  TouchableOpacity, 
  Image,
  ToastAndroid} from 'react-native';
import Header from '../resources/header';

function AddProduct(props){

  const {navigation} = props
  const dispatch = useDispatch()

  const [searchedProduct, setSearchedProduct] = useState("")
  const [searchHasFocus, setSearchHasFocus] = useState(false)
  const [rechercheModal, setRechercheModal] = useState(false)
  const [listePropositions, setListePropositions] = useState([])
  const [listeProduits, setListeProduits] = useState([])
  const [displayModale, setDisplayModale] = useState(false)
  const [detectionResults, setDetectionResults] = useState([])

  const inventaireId = navigation.getParam('inventaireId', 'NO-ID')

  React.useEffect(() => {
    if(detectionResults != null && detectionResults != ""){
      var results = JSON.parse(detectionResults)
      if(results.length > 0){
        console.log("Results : " + detectionResults)

        var items = [...listeProduits]

        for(let i = 0; i < results.length; i++){
          items.push({
            "id":i, 
            "nom":results[i].nom, 
            "inventaire_produit":[{
              "quantite" : results[i].quantity
            }]
          }) 
        }

        setListeProduits(items)
        setDetectionResults(null)
        
      }else{
        ToastAndroid.show("Nous n'avons rien détecté... Veuillez réessayer !", ToastAndroid.LONG);
      }
    }
  }, [detectionResults])

  React.useEffect(() => {
    if(searchedProduct.length >= 3){
      getProduitsLike(searchedProduct, props.api_token).then(data => {
        setListePropositions(data)
      })
    }else{
      setListePropositions([])
    }
  }, [searchedProduct])

  const _initiateObjectDetection = () => {
    DetectionManager.initiateDetection(() => {
      setTimeout(function () {
        setDisplayModale(true)
    }, 3000);
    })
  }

  const getDetectionResults = () => {

    var RNFS = require('react-native-fs');
    var filePath = null;
    var fileContent = null;
  
    //RNFS.ExternalDirectoryPath...
    RNFS.readDir("/storage/emulated/0/Android/data/com.frigoto/files/Documents")
    .then((result) => {
        result.forEach((it)=>{
            filePath = it.path
            RNFS.readFile(filePath)
            .then((content)=>{
              fileContent = JSON.parse(content)
              setDetectionResults(fileContent)
              RNFS.unlink(filePath)                  
              return null
            })
        })
    })
  }

  const detectionResultsModal = () => {
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
            <TouchableOpacity
              style={[styles.buttonModale]}
              onPress={() => {
                setDisplayModale(false)
                getDetectionResults()
              }
              }
            >
              <Text style={styles.buttonTextModale}>Detection d'objets</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
      )
  }

  const _incrementerProduit = (index) => {
    let liste = [...listeProduits]
    liste[index].inventaire_produit.quantite += 1
    setListeProduits(liste)
  }

  const _decrementerProduit = (index) => {
    let liste = [...listeProduits]
    liste[index].inventaire_produit.quantite -= 1
    if(liste[index].inventaire_produit.quantite <= 0){
      liste.splice(index,1)
    }
    setListeProduits(liste)
  }

  const _chooseProposition = (product) => {
    setSearchHasFocus(false)
    console.log(product)
    let liste = [...listeProduits]
    let index = liste.findIndex(element => element.nom === product.nom) 
    if(index >= 0){
      
      liste[index].inventaire_produit.quantite += 1
    }else{
      liste.push({
        "id":product.id,
        "nom":product.nom,
        "inventaire_produit":
          {
            "quantite":1
          },
        "imageUrl":product.imageUrl
      })
    }
    setListeProduits(liste)
  }

  const _displayPropositionList = (index) => {
    if(searchHasFocus == true){
      return(
        <FlatList 
          data={listePropositions}
          style={styles.listePropositions}
          contentContainerStyle={{ borderWidth: 0.5 }} 
          keyExtractor={(item, index) => item.id}
          ListEmptyComponent={() => {
            return (
              <Text style={styles.propositionText}>
                Aucune correspondance.
              </Text>
            )
          }}
          renderItem={({item, index}) =>
            <TouchableOpacity
              onPress={()=>{_chooseProposition(item)}}
            >
              <Text style={styles.propositionText}>{item.nom}</Text>
            </TouchableOpacity>
          }
        />
      )
    }
  }

  const _displayRechercheModal = () => {
    if(rechercheModal == true) {
      return(
        <TouchableOpacity
          style={styles.rechercheModale}
          onPress={() => {
            setSearchHasFocus(false)
            setRechercheModal(false)
          }}
        ></TouchableOpacity>
      )
    }
  }

  const _sendProductsToServer = () => {
    postProduits(inventaireId, listeProduits, props.api_token)
    .then((data) => {
      ToastAndroid.show(data.message, ToastAndroid.LONG)
      navigation.state.params.onGoBack()
      navigation.goBack()
    })
  }

    return(
      <>
        <Header navigation={props.navigation}/>
        {detectionResultsModal()}
        <View style={styles.rechercheContainer}> 
          <View style={styles.textInputLine}>
            <TextInput
              style={styles.inputText}
              value={searchedProduct}
              placeholder="Rechercher un produit"
              onFocus={() => {
                setSearchHasFocus(true)
                setRechercheModal(true)
              }}
              onChangeText={(texte) => {setSearchedProduct(texte)}}
            ></TextInput>
          </View>
            {_displayPropositionList()}
            {_displayRechercheModal()}
            
        </View>
        <View style={styles.container}>
          <ProductList
            listeProduits={listeProduits}
            boutonPlus={(id, index) => _incrementerProduit(index)}
            boutonMoins={(id,index) => _decrementerProduit(index)}
            emptyMessage={"Aucun produit dans la liste."}
            editable={true}
          />
          <TouchableOpacity
            style={styles.cacheMisere}
            onPress={() => {}}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.validateButton}
            onPress={() => _sendProductsToServer()}>
              <Text style={styles.validateButtonText}>Valider</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.floatingactionbutton}
            onPress={() => _initiateObjectDetection()}>
            <Image
              style={styles.floatingactionbutton_image}
              source={require('../../assets/camera.png')} />
          </TouchableOpacity>
        </View>
      </>
      
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

export default connect(mapStateToProps)(AddProduct)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  textInputLine:{
    flexDirection: 'row',
  },
  inputText:{
    flex: 1,
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  rechercheModale:{
    flex:1,
    marginTop: 49,
    width: '100%',
    height: 1000,
    position: 'absolute',
    zIndex: 2,
  },
  rechercheContainer:{
    flexDirection: "column",
    alignItems : 'center',
  },
  listePropositions:{
    position: 'absolute',
    zIndex: 3,
    backgroundColor: 'white',
    width: "95%",
    marginTop:49,
  },
  propositionText:{
    fontSize: 16,
    padding: 15,
    borderBottomWidth: 0.5,
  },
  cacheMisere:{
    position: 'absolute',
    zIndex:0,
    width: "100%",
    height: 70,
    bottom: 0,
    backgroundColor: '#EEEEEE',
  },
  validateButton:{
    position: 'absolute',
    width: "75%",
    height: 50,
    left: 10,
    bottom: 10,
    borderRadius: 10,
    backgroundColor: '#df4c4c',
    justifyContent: 'center',
    alignItems: 'center'
  },
  validateButtonText:{
    color : "white",
    fontWeight : 'bold',
    fontSize: 20,
    textTransform : 'uppercase',
    letterSpacing : 1.2,
  },
  floatingactionbutton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 10,
    bottom: 10,
    borderRadius: 30,
    backgroundColor: '#df4c4c',
    justifyContent: 'center',
    alignItems: 'center'
  },
  floatingactionbutton_image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: 'white',
  },
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
