import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
// import { Link } from 'react-router'
import ReactEchartsCore from 'echarts-for-react/lib/core'
// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/theme/dark'
// import 'echarts/theme/roma'
// import 'echarts/theme/vintage'
import 'echarts/theme/macarons'
// import 'echarts/theme/infographic'
import ThemeChartComponent from './echarts/ThemeChartComponent'
import ChartAPIComponent from './echarts/ChartAPIComponent'
import DynamicChartComponent from './echarts/DynamicChartComponent'

const options = {
  option: {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告', '直接访问'],
      left: 'left',
      // orient: 'vertical',
    },
    toolbox: {
      show: true,
      right: '20',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [{
      name: '邮件营销',
      type: 'line',
      stack: '总量',
      areaStyle: { normal: {} },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '联盟广告',
      type: 'line',
      stack: '总量',
      areaStyle: { normal: {} },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '视频广告',
      type: 'line',
      stack: '总量',
      areaStyle: { normal: {} },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: '直接访问',
      type: 'line',
      stack: '总量',
      areaStyle: { normal: {} },
      data: [320, 332, 301, 334, 390, 330, 320],
    }],
  },
}

const ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  style: {
    marginBottom: 16,
  },
}

/*
 javascript 修饰符，es7的语法，可以被babel转换。
 类的修饰 see http://es6.ruanyifeng.com/#docs/decorator#%E7%B1%BB%E7%9A%84%E4%BF%AE%E9%A5%B0

 修饰器的行为就是下面这样:
 @decorator
 class A {}

 // 等同于
 class A {}
 A = decorator(A) || A;

 */
@connect(
  ({ app }) => ({ app })
)
export default class HomeView extends React.Component {
  constructor () {
    super()
  }

  componentWillMount () {
    // 这里可以load数据， 类似window.onload
  }

  render () {
    const { app: { theme } } = this.props
    return (
      <div className="content">
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col span={12} {...ColProps}>
            <DynamicChartComponent theme={theme === 'dark' ? theme : 'macarons'} />
          </Col>
          <Col span={12} {...ColProps}>
            <ReactEchartsCore
              echarts={echarts}
              {...options}
              notMerge
              lazyUpdate
              style={{
                height: 500,
                width: '100%',
              }}
              theme={theme === 'dark' ? theme : 'macarons'}
            />
          </Col>
          <Col span={12} {...ColProps}>
            <ThemeChartComponent theme={theme === 'dark' ? theme : 'macarons'} />
          </Col>
          <Col span={12} {...ColProps}>
            <ChartAPIComponent theme={theme === 'dark' ? theme : 'macarons'} />
          </Col>
        </Row>
      </div>
    )
  }
}

HomeView.propTypes = {
  app: PropTypes.object,
}
