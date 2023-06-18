import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

const Login = () => {
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
    navigate('/home')
  }

  return (
    <div className={styles.login_page}>
      <Form
        name="normal_login"
        className={styles.login_form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <a href="" style={{ float: 'right' }}>
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>

        随便填写～点击登录
      </Form>
    </div>
  )
}

export default Login
