//const url = 'http://192.168.1.97:8080/api/'
//const url = 'http://127.0.0.0:8080/api'
const url = 'https://frigoto.herokuapp.com/api/'

export function signIn (email, password) {
  return fetch(url+"auth/signin", {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      email : email,
      password : password
    })
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function signUp (username, surname, email, password) {
  return fetch(url+"auth/signup", {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      name: username,
      surname: surname,
      email : email,
      password : password
    })
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function deleteAccount(id, token) {
  return fetch(url+"auth/delete", {
    method : 'POST',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      id: id
    })
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
