const baseUrl = `http://localhost:3000/api/v1`

const headers = () => {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}

export class AuthAdapter {
  static login(loginParams){
    return fetch(`${baseUrl}/auth`, {
      method: 'post',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static currentDevice(){
    return fetch(`${baseUrl}/current_device`, {
      headers: headers()
    }).then(res => res.json())
  }
}

export class PositionsAdapter {
  // static all(){
  //   fetch(baseUrl)
  //     .then(res => res.json())
  //     .then(console.log) // testing
  // }

  static create(position){
    return fetch(`${baseUrl}/positions`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          position: position
        })
      }).then(res => res.json())
  }
}
