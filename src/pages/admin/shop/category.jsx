import React, { PureComponent } from 'react'

import './category.scss'

import { Button, Table, Tag, Space, Pagination  } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
const { Column, ColumnGroup } = Table;

import LinkButton from '@/component/link-button'

import AddCategory from './component/addCategory'
import UpdateCategory from './component/updateCategory'

const data = [
  {
    id: 1,
    key: '1',
    categoryName: '洗碗机'
  },
  {
    id: 2,
    key: '2',
    categoryName:'洗衣机'
  },
  {
    id: 3,
    key: '3',
    categoryName: '冰箱'
  },
];

/**
 * 原理：（父组件调用子组件的属性和方法）
当在子组件中调用onRef函数时，正在调用从父组件传递的函数。
this.props.onRef（this）这里的参数指向子组件本身，父组件接收该引用作为第一个参数：onRef = {ref =>（this.child = ref）}然后它使用this.child保存引用。
之后，可以在父组件内访问整个子组件实例，并且可以调用子组件函数
 */
export default class Category extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false,
      categoryObj: {}
    }
  }
  render() {
    const { categoryObj } = this.state
    return (
      <div className="category-container">
        <div className="category-top">
          <LinkButton>一级分类&gt;&gt;</LinkButton>
          <span>家电</span>
          <Button type="primary" onClick={this.childClick}>
            <PlusOutlined />
            添加
          </Button>
        </div>
        <Table dataSource={data} pagination={false}>
          <Column title="分类名" dataIndex="categoryName" key="categoryName" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a href="#" className="changeCategory" onClick={() => this.updateCategory(text)}>修改分类</a>
              </Space>
            )}
          />
        </Table>
        <Pagination showQuickJumper total={20} />
        {/*2、 获取整个AddCategory元素 */}
        <AddCategory onRef={(ref) => {this.child = ref}}/>
        <UpdateCategory onRef={(ref) => {this.child2 = ref}} categoryObj={categoryObj}/>
      </div>
    )
  }
  // 调用子组件事件
  childClick = () => {
    // 3、通过this.child获取AddCategory的所有属性和方法
    this.child.showModal()
  }

  updateCategory(obj) {
    // console.log(obj,'查看分类');
    const newObj = {...this.state.categoryObj, ...obj}
    this.setState({
      categoryObj: newObj
    })
   this.child2.showModal()
  }
}
