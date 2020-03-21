import Http from '../api/http.js'

class User extends Http {
  constructor() {
    super()
  }
  smsLogin(params) {
    const url = 'xxx';
    return this.get(params, url)
  }
}

export default User
