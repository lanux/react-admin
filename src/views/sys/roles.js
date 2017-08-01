import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Col, message, Form, Row, Input, Table } from 'antd'
import { actions } from '../../redux/domain/sysRole'

const SysRoleView = ({
                       sysRole,
                       ...others
                     }) => {
  const { fetchRequest } = others

  const handleSubmit = () => {
    fetchRequest()
  }

  return (
    <div className="content-inner">
      <Button type="primary" icon="search" size="large" loading={sysRole.loading} className="margin-right" onClick={handleSubmit}>查询</Button>
    </div>
  )
}
SysRoleView.propTypes = {
  sysRole: PropTypes.object,
  form: React.PropTypes.object,
}

export default connect(({ sysRole }) => ({ sysRole }), actions)(Form.create()(SysRoleView))
