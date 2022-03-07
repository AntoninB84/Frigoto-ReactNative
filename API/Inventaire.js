//const url = 'http://192.168.1.97:8080/api/'
const url = 'https://frigoto.herokuapp.com/api/'

export function createInventaire (userId, nom, token) {
  return fetch(url+"user/inventaire", {
    method : 'POST',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      userId : userId,
      nom : nom
    })
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getInventaires(userId, token) {
  return fetch(url+"user/inventaires/"+userId, {
    method : 'GET',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function updateInventaireNom(inventaireId, nom, token){
  return fetch(url+"inventaire/"+inventaireId, {
    method : 'PUT',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      nom : nom
    })
  })
    .then((response) => console.log(response.json()))
    .catch((error) => console.error(error))
}

export function deleteInventaire(inventaireId, token){
  return fetch(url+"inventaire/"+inventaireId, {
    method : 'DELETE',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => console.log(response.json()))
    .catch((error) => console.error(error))
}
