const baseUrl = `http://localhost:3000/api/v1`

const headers = () => ({
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
})

export class AuthAdapter {
  static login(params){
    return fetch(`${baseUrl}/auth`, {
      method: 'post',
      headers: headers(),
      body: JSON.stringify(params)
    }).then(res => res.json())
  }

  static currentDevice(){
    return fetch(`${baseUrl}/current_device`, {
      headers: headers()
    }).then(res => res.json())
  }
}

export class PositionsAdapter {
  static create(position){
    debugger
    return fetch(`${baseUrl}/positions`, {
        method: 'post',
        headers: headers(),
        body: JSON.stringify({
          position: position
        })
      }).then(res => res.json())
  }
}
