import React from 'react'
import ReactEcharts from 'echarts-for-react'

class DynamicChartComponent extends React.Component {

  static propTypes = { // as static property
    theme: React.PropTypes.string,
  };

  constructor(props) {
    super(props)
    this.state = { // define this.state in constructor
      option: this.getOption(),
    }
    this.fetchNewDate = this.fetchNewDate.bind(this)
  }

  componentDidMount () {
    if (this.timeTicket) {
      clearInterval(this.timeTicket)
    }
    this.timeTicket = setInterval(this.fetchNewDate, 1000)
  }
  componentWillUnmount () {
    if (this.timeTicket) {
      clearInterval(this.timeTicket)
    }
  }

  getOption () {
    const option = {
      title: {
        text: '测试数据',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['最新成交价', '预购队列'],
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      grid: {
        top: 60,
        left: 30,
        right: 60,
        bottom: 30,
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: (function () {
            let now = new Date()
            let res = []
            let len = 50
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
              now = new Date(now - 2000)
            }
            return res
          }()),
        },
        {
          type: 'category',
          boundaryGap: true,
          data: (function () {
            let res = []
            let len = 50
            while (len--) {
              res.push(50 - len + 1)
            }
            return res
          }()),
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '价格',
          max: 20,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
        {
          type: 'value',
          scale: true,
          name: '预购量',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: '预购队列',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 4,
            },
          },
          animationEasing: 'elasticOut',
          animationDelay (idx) {
            return idx * 10
          },
          animationDelayUpdate (idx) {
            return idx * 10
          },
          data: (function () {
            let res = []
            let len = 50
            while (len--) {
              res.push(Math.round(Math.random() * 1000))
            }
            return res
          }()),
        },
        {
          name: '最新成交价',
          type: 'line',
          data: (function () {
            let res = []
            let len = 0
            while (len < 50) {
              res.push((Math.random() * 10 + 5).toFixed(1) - 0)
              len++
            }
            return res
          }()),
        },
      ],
    }

    return option
  }
  timeTicket = null
  count = 51
  fetchNewDate () {
    let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '')
    let option = this.state.option
    let data0 = option.series[0].data
    let data1 = option.series[1].data
    data0.shift()
    data0.push(Math.round(Math.random() * 1000))
    data1.shift()
    data1.push((Math.random() * 10 + 5).toFixed(1) - 0)
    option.xAxis[0].data.shift()
    option.xAxis[0].data.push(axisData)
    option.xAxis[1].data.shift()
    option.xAxis[1].data.push(this.count++)
    this.setState({ option })
  }

  render () {
    return (
      <div className="examples">
        <div className="parent">
          <ReactEcharts ref="echarts_react"
            option={this.state.option}
            style={{ height: '500px', width: '100%' }}
            className="react_for_echarts"
            theme={this.props.theme}
          />
        </div>
      </div>
    )
  }
}

export default DynamicChartComponent
