import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import './index.scss'
import axios from 'axios'

import http from '@/api/login'
import { formatDate } from '@/utils/dateUtils'
import storageUtils from '@/utils/storageUtils'
import menuList from '@/router/routes'

import { Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

import LinkButton from '@/component/link-button/index'

class Header extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      weather: {},
      username: '',
      currentTime: formatDate(Date.now(),'yyyy-MM-dd- hh:mm:ss ')
    }
  }
  componentDidMount() {
    this.getWeatherInfo()
    this.getBaseInfo()
    this.getTime()
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
  render() {
    const { weather: { weather, city }, username, currentTime } = this.state
    const title = this.getTitle()
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎，{username}</span>
          <LinkButton onClick={() => this.logout()}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>
            <span>{title}</span>
          </div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <span>{weather}</span>
            <span>{city}</span>
          </div>
        </div>
      </div>
    )
  }

  async getWeatherInfo() {
    const res = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=f2a33e36882c97805f229e56e65eb176&city=440700')  
    this.setState({
      weather: res.data.lives[0]
    })
  }

  async getBaseInfo() {
    const res = await http.getBaseInfo()
    this.setState({
      username: res.username
    })
  }

  getTime() {
    this.intervalId = setInterval(() => {
      let currentTime = formatDate(Date.now(),'yyyy-MM-dd- hh:mm:ss')
      this.setState({currentTime})
    }, 1000)
  }

  getTitle() {
    const path = this.props.location.pathname
    let title;
    menuList.forEach(item => {
      if(item.key === path) {
        title = item.title
      }else if(item.children) {
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        if(cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  logout() {
    confirm({
      title: '确定要退出登录吗?',
      icon: <ExclamationCircleOutlined />,
      content: '是请点确定，否则点取消',
      onOk: () => {
        storageUtils.removeToken()
        this.props.history.replace('/login')
      },
      onCancel: () => {
        console.log('Cancel');
      },
   });
  }

}

export default withRouter(Header)