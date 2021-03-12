import React, { PureComponent } from 'react'
import { Modal, Button, Form, Input, } from 'antd';

export default class UpdateCategory extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      confirmLoading: false,
      layout: {
        labelCol: { span: 4},
        wrapperCol: { span: 16 },
      }
    }
  }

  formRef = React.createRef() 

  componentDidMount() {
    this.props.onRef(this)
  }
  showModal = () => {
    this.setState({
      visible: !this.state.visible
    })
    // this.formRef.current && this.formRef.current.resetFields()

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
    }, 2000);
    this.formRef.current.resetFields()
  };

  handleCancel = () => {
    this.formRef.current.resetFields()
    this.setState({
      visible: !this.state.visible
    })

  };
  
  render() {
    const { visible, confirmLoading, layout } = this.state
    const { categoryName } = this.props.categoryObj
    return (
      <Modal
        title="修改分类"
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          requiredMark={false}
          ref={this.formRef}
        >
          <Form.Item
            label="修改分类名："
            name="categoryName"
            rules={[{ required: true, message: '请输入分类名' }]}
            initialValue={categoryName}
          >
            <Input />
          </Form.Item>

        </Form>
      </Modal>

    )
  }

};