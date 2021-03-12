import { Modal, Form, Input, Button, Select } from 'antd';
const { Option } = Select;

import React, { PureComponent } from 'react'


export default class AddCategory extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      confirmLoading: false,
      layout: {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 16,
        },
      },
    }
  }

  showModal = () => {
    this.setState({
      visible: !this.state.visible
    })
  };

  handleOk = () => {
    this.setState({
      confirmLoading: !this.state.confirmLoading
    })
    setTimeout(() => {
      this.setState({
        visible: !this.state.visible,
        confirmLoading: !this.state.confirmLoading
      })
    }, 20000);
    this.onReset()
  };

  handleCancel = () => {
    this.setState({
      visible: !this.state.visible
    })
  };

  componentDidMount() {
    // 1、将AddCategory传递给this.props.onRef()方法
    this.props.onRef(this)
  }
  formRef = React.createRef()

  render() {
    const { visible, confirmLoading, layout, tailLayout } = this.state
    return (
      <div>
        <Modal
          title="添加分类"
          visible={visible}
          // onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" htmlType="submit" onClick={this.handleSubmitCategory}>确定</Button>,
            <Button key="cancel" htmlType="button" onClick={this.onReset}>取消</Button>
          ]}
        >
          <Form {...layout} ref={this.formRef} name="control-hooks" requiredMark={false} >
            <Form.Item
              name="pCategory"
              label="所属分类："
              rules={[
                {
                  required: true,
                  message: '请选择所属分类'
                },
              ]}
            >
              <Select
                placeholder=""
                allowClear
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="cCategory"
              label="添加子分类："
              rules={[
                {
                  required: true,
                  message: '请输入子分类名称'
                },
              ]}
            >
              <Input placeholder="请输入子分类名称" />
            </Form.Item>
          </Form>

        </Modal>
      </div>
    )
  }

 handleSubmitCategory = async () =>{
  //  验证表单
  try {
    const values = await this.formRef.current.validateFields()
    console.log(values);
    this.handleOk()

  }catch(errorInfo) {
    console.log(errorInfo,'errorInfo');
    }
  }

  // 重置表单
  onReset = () => {
    this.formRef.current.resetFields()
  }
}
