import {connect, useSelector, useDispatch} from 'react-redux'
import React, {useContext, useState} from 'react';
import DetectionManager from "../objectDetection/objectDetection"
import { 
  Alert,
  Modal,
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  Image,
  ToastAndroid} from 'react-native';
import Header from '../resources/header';

function AddProduct(props){

  const {navigation} = props
  const dispatch = useDispatch()
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
            "quantity":results[i].quantity
          }) 
        }

        setListeProduits(items)
        setDetectionResults(null)
        
      }else{
        ToastAndroid.show("Nous n'avons rien détecté... Veuillez réessayer !", ToastAndroid.LONG);
      }
    }
  }, [detectionResults])

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


    return(
      <>
        <Header navigation={props.navigation}/>
        {detectionResultsModal()}
        <Text>Ici il faudra mettre un select en autocomplétion ou un truc du genre</Text>
        <View style={styles.container}>
          <FlatList
            data={listeProduits}
            numColumns={3}
            style={styles.liste}
            contentContainerStyle={{ paddingBottom: 80 }} 
            keyExtractor={(item, index) => item.id}
            ListEmptyComponent={() => {
              return (
              <Text style={styles.emptyMessage}>
                Aucun aliment à ajouter.
              </Text>
              )
            }}
            renderItem={({item}) =>
              <TouchableWithoutFeedback
              >
                <View style={styles.listeItemContainer}>
                  <Image 
                    style={styles.listeItemImage}
                    source={require('../../assets/frigoto.png')}
                  />
                  <Text style={styles.listeItemName}>{item.nom}</Text>
                  <View style={styles.listeQuantityLine}>
                    <TouchableOpacity
                      onPress={() => {}}
                    >
                      <Image
                        style={styles.listeItemIcons}
                        source={require('../../assets/moins.png')}
                      />
                    </TouchableOpacity>
                    <Text>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => {}}
                    >
                      <Image
                        style={styles.listeItemIcons}
                        source={require('../../assets/plus.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            }
          />


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
  liste:{
    padding: 10,
    paddingBottom: 100,
  },
  listeItemContainer:{
    borderColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    padding: 1,
    margin: '1.67%',
    width: '30%',
  },
  listeItemName: {
    fontSize: 10,
    textAlign: 'center',
    padding: 2,
    color: "red"
  },
  listeItemImage:{
    backgroundColor: "white",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    width: '100%',
    height: 100,
  },
  listeQuantityLine:{
    flexDirection: "row",
    justifyContent: 'space-between',
    alignContent: "center",
    margin: 5,
  },
  listeItemIcons:{
    height:20,
    width: 20
  },
  emptyMessage:{
    textAlign: "center",
    marginTop: '50%',
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
