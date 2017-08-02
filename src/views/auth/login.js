import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Row, Form, Input, Icon, Col, Checkbox } from 'antd'
import styles from './login.less'
import config from '../../utils/config'
import { actions } from '../../redux/domain/login'


const FormItem = Form.Item

const Login = ({
                 login,
                 form: {
                   getFieldDecorator,
                   validateFieldsAndScroll,
                 },
                 ...others
               }) => {
  const { loading } = login

  const { doLogin } = others

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      doLogin({ payload: values })
    })
  }

  return (
    <div style={{ height: '100%' }}>
      <div className={styles.logo}>
        <Icon type="github" className={styles.logoicon} />
        <h2>{config.project_name}</h2>
      </div>
      <div className={styles.login}>
        <Row gutter={0}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.form}>
            <h2 className={styles.logintitle}>登录</h2>
            <form>
              <FormItem hasFeedback>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input size="large" prefix={<Icon type="user" style={{ fontSize: 13 }} />} onPressEnter={handleOk} placeholder="用户名" />)}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" onPressEnter={handleOk} placeholder="密码" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住我</Checkbox>
                )}
                <a style={{ float: 'right' }}>忘记密码</a>
                <Button type="primary" size="large" onClick={handleOk} loading={loading}>
                  登录
                </Button>
              </FormItem>
            </form>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.register} >
            <div>
              <h2>注册</h2>
              <p>平台暂时只支持使用公司邮箱注册.</p>
              <Button type="default" size="large" ghost style={{ marginTop: 48 }}>
                注册
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
}

export default connect(({ login }) => ({ login }), actions)(Form.create()(Login))
