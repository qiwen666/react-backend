import React, { PureComponent } from 'react'

import { Form, Input, Button, message as Message } from 'antd';

import http from '@/api/login'

import './login.scss'

// import memoryUtils from '@/utils/memoryUtils'
import storageUtils from '@/utils/storageUtils'

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};
const checkPassword = (rule, value) => {
  return new Promise(async (resolve, reject) => {
    if(!value) {
      await reject('密码必须输入')
    }else if(!/^[0-9a-zA-Z]{6,20}$/g.test(value)) {
      await reject('密码格式由大小写字母+数字组成,不低于6位,不超过20位')
    }else {
      await resolve()
    }
  })
}

export default class Login extends PureComponent {
  
  render() {
    return (
      <div className="login-layout">
        <div className="login-container">
          <div className="login-title">用户登录</div>
          <Form
          onFinish={ (values) => this.handleSubmitLogin(values)}
          {...layout}
            className="login-form"
            name="basic"
            requiredMark={false} //for表单项必填标识
          >
            <Form.Item 
            label="Username" 
            name="username"
            initialValue='kaeery'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              }
            ]}
            >
              <Input />
            </Form.Item>

            <Form.Item 
            label="Password" 
            name="password"
            rules={[
              { validator: checkPassword }
            ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="submit-btn">
              <Button type="primary" htmlType="submit" className="login-form-button">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }

  async handleSubmitLogin(value) {
    const { username, password } = value
    const { access_token, msg } = await http.submitLogin({ username, password })
    // memoryUtils.token = access_token
    storageUtils.saveToken(access_token)
    Message.success(msg)
    this.props.history.replace('/home')  
  }
}
