import react, { PureComponent } from 'react'
import 'antd/dist/antd.css'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Admin from './pages/admin/admin.jsx'
import Login from './pages/login/login.jsx'

// import memoryUtils from './utils/memoryUtils'
// import storageUtils from './utils/storageUtils'


// const token = storageUtils.getToken()
// memoryUtils.token = token

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Admin}/>
        </div>
      </Router>
        
    )
  }
}
