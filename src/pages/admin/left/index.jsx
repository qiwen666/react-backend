import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
// 引入组件库
import { Menu } from 'antd';
const { SubMenu } = Menu;

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

// 引入scss
import './index.scss'

import menuList from '@/router/routes'

class LeftNav extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  getMenuList(menuList) {
    const path = this.props.location.pathname

    return menuList.map(item => {
      if(!item.children) {
        return (
          <Menu.Item key={item.key} >
            <Link to={item.key}>{item.title}</Link>
        </Menu.Item>
        )
      }else {
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        if(cItem) {
          this.openKey = item.key
        }
        return (
          <SubMenu key={item.key} title={item.title}>
              {
                this.getMenuList(item.children)
              }
          </SubMenu>
        )

      }
    })

  }
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuList(menuList)
  }
  /** withRouter()
   * 包装非路由组件, 返回一个新的组件
   * 新的组件向非路由组件传递3个属性: history/location/match
   */
  // 
  render() {
    const path = this.props.location.pathname
    const openKey = this.openKey
    return (
      <div>
        <div className="logo" >
          后台管理系统
        </div>
        <Menu theme="dark" defaultSelectedKeys={[openKey]} selectedKeys={[path]} mode="inline">
          {
            this.menuNodes
          }

        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)
