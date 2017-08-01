import React from 'react'
import ReactEcharts from 'echarts-for-react'
import 'echarts/map/js/china'

const MapChartComponent = React.createClass({
  propTypes: {
  },
  timeTicket: null,
  getInitialState () {
    return { option: this.getOtion() }
  },
  componentDidMount () {
    if (this.timeTicket) {
      clearInterval(this.timeTicket)
    }
    this.timeTicket = setInterval(() => {
      const option = this.state.option
      const r = new Date().getSeconds()
      option.title.text = `iphone销量${r}`
      option.series[0].name = `iphone销量${r}`
      option.legend.data[0] = `iphone销量${r}`
      this.setState({ option })
    }, 1000)
  },
  componentWillUnmount () {
    if (this.timeTicket) {
      clearInterval(this.timeTicket)
    }
  },
  randomData () {
    return Math.round(Math.random() * 1000)
  },
  getOtion () {
    const option = {
      title: {
        text: 'iphone销量',
        subtext: '纯属虚构',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['iphone6', 'iphone7', 'iphone8'],
      },
      visualMap: {
        min: 0,
        max: 2500,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true,
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: 'iphone6',
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          data: [
            { name: '北京', value: this.randomData() },
            { name: '天津', value: this.randomData() },
            { name: '上海', value: this.randomData() },
            { name: '重庆', value: this.randomData() },
            { name: '河北', value: this.randomData() },
            { name: '河南', value: this.randomData() },
            { name: '云南', value: this.randomData() },
            { name: '辽宁', value: this.randomData() },
            { name: '黑龙江', value: this.randomData() },
            { name: '湖南', value: this.randomData() },
            { name: '安徽', value: this.randomData() },
            { name: '山东', value: this.randomData() },
            { name: '新疆', value: this.randomData() },
            { name: '江苏', value: this.randomData() },
            { name: '浙江', value: this.randomData() },
            { name: '江西', value: this.randomData() },
            { name: '湖北', value: this.randomData() },
            { name: '广西', value: this.randomData() },
            { name: '甘肃', value: this.randomData() },
            { name: '山西', value: this.randomData() },
            { name: '内蒙古', value: this.randomData() },
            { name: '陕西', value: this.randomData() },
            { name: '吉林', value: this.randomData() },
            { name: '福建', value: this.randomData() },
            { name: '贵州', value: this.randomData() },
            { name: '广东', value: this.randomData() },
            { name: '青海', value: this.randomData() },
            { name: '西藏', value: this.randomData() },
            { name: '四川', value: this.randomData() },
            { name: '宁夏', value: this.randomData() },
            { name: '海南', value: this.randomData() },
            { name: '台湾', value: this.randomData() },
            { name: '香港', value: this.randomData() },
            { name: '澳门', value: this.randomData() },
          ],
        },
        {
          name: 'iphone7',
          type: 'map',
          mapType: 'china',
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          data: [
            { name: '北京', value: this.randomData() },
            { name: '天津', value: this.randomData() },
            { name: '上海', value: this.randomData() },
            { name: '重庆', value: this.randomData() },
            { name: '河北', value: this.randomData() },
            { name: '安徽', value: this.randomData() },
            { name: '新疆', value: this.randomData() },
            { name: '浙江', value: this.randomData() },
            { name: '江西', value: this.randomData() },
            { name: '山西', value: this.randomData() },
            { name: '内蒙古', value: this.randomData() },
            { name: '吉林', value: this.randomData() },
            { name: '福建', value: this.randomData() },
            { name: '广东', value: this.randomData() },
            { name: '西藏', value: this.randomData() },
            { name: '四川', value: this.randomData() },
            { name: '宁夏', value: this.randomData() },
            { name: '香港', value: this.randomData() },
            { name: '澳门', value: this.randomData() },
          ],
        },
        {
          name: 'iphone8',
          type: 'map',
          mapType: 'china',
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          data: [
            { name: '北京', value: this.randomData() },
            { name: '天津', value: this.randomData() },
            { name: '上海', value: this.randomData() },
            { name: '广东', value: this.randomData() },
            { name: '台湾', value: this.randomData() },
            { name: '香港', value: this.randomData() },
            { name: '澳门', value: this.randomData() },
          ],
        },
      ],
    }
    return option
  },
  render () {
    return (
      <div className="examples">
        <div className="parent">
          <ReactEcharts
            option={this.state.option}
            style={{ height: '500px', width: '100%' }}
            className="react_for_echarts"
            theme="macarons"
          />
        </div>
      </div>
    )
  },
})

export default MapChartComponent
