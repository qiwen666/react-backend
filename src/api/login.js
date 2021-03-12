import service from '../utils/axios'

export default {

  submitLogin(data) {
    return service({
      url: '/user/login',
      method: 'post',
      data
    })
  },

  getBaseInfo() {
    return service({
      url: '/user/profile',
      method: 'post',
    })

  }

}