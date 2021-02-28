import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import SvgYellowBug from './svg/SvgYellowBug'
import SvgArrowRight from './svg/SvgArrowRight'

// 日曆引用自：https://www.cnblogs.com/slongs/p/10174659.html
class ActCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDay: '',
      currentMonth: '',
      currentYear: '',
      dayList: [],
      orderLists: '',
    }
    // const { orderLists } = props
    console.log('props', props)
    // console.log('order data2', orderLists)

    this.getDataFromServer = this.getDataFromServer.bind(this)
    this.initCalendar = this.initCalendar.bind(this)
    this.renderBody = this.renderBody.bind(this)
    this.preMonth = this.preMonth.bind(this)
    this.nextMonth = this.nextMonth.bind(this)
    // console.log('this state', this.state)
    // console.log('this', this)
  }

  componentWillMount() {
    // style.use() // 需要配置loader 可以直接注释 忽略掉  实现每个模块卸载之后 css也会销毁 可以看之前写的一篇react css局部作用域的文章
  }

  componentWillUnmount() {
    // style.unuse() // 需要配置loader 可以直接注释 忽略掉 实现每个模块卸载之后 css也会销毁 可以看之前写的一篇react css局部作用域的文章
  }

  componentDidMount() {
    this.getDataFromServer()
    this.initCalendar()
  }

  componentWillUpdate() {
    // console.log('componentWillUpdate', this.props)
  }

  getDataFromServer() {
    const userId = localStorage.getItem('userId')
    const url = 'http://localhost:3333/member/actorder'
    const that = this
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        userId: userId,
      }), // data can be `string` or {object}!
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => {
        that.setState({ orderLists: response.rows })
        that.initCalendar(response.rows)
      })

    // const response = await fetch(request)
    // const data = await response.json()
    // console.log('response', response)
    // console.log('order data', data)
    // setOrderLists(data)
  }

  // 取得目前dete的月份第一天的字串
  getMonthFirstDate(date) {
    let nowYear = date.getFullYear() // 取得年
    let nowMonth = date.getMonth() + 1 // 取得月
    return `${nowYear}-${nowMonth}-01`
  }

  // 取得目前dete的字串
  getDateString(date) {
    let nowYear = date.getFullYear() // 取得年
    let nowMonth = date.getMonth() + 1 // 取得月
    let day = date.getDate()
    day = day < 10 ? '0' + day : day
    return `${nowYear}-${nowMonth}-${day}`
  }

  // 上個月
  preMonth() {
    let date = new Date(
      `${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`
    )
    let preMonthFirstDate = new Date(
      this.getMonthFirstDate(new Date(date.setDate(0)))
    ) // 0 是上個月的最後一天
    this.initCalendar(null, preMonthFirstDate)
  }

  // 下個月
  nextMonth() {
    let date = new Date(
      `${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`
    )
    let nextMonthFirstDate = new Date(
      this.getMonthFirstDate(new Date(date.setDate(33)))
    )
    this.initCalendar(null, nextMonthFirstDate)
  }

  // 初始化日曆
  initCalendar(data, currentDate) {
    let initData = data ? data : this.props.orderLists.rows

    // 日曆部分
    let nowDate = currentDate ? currentDate : new Date()
    let nowMonthFirstDate = this.getMonthFirstDate(nowDate) // 取得當月的1號
    let nowWeek = new Date(nowMonthFirstDate).getDay()
      ? new Date(nowMonthFirstDate).getDay()
      : 7 // 取得星期
    let newDateList = [] // 建立日期陣列
    let startDay = 2 - nowWeek // 開始日期的下標  因為setDate(0)是上個月最後一天，所以是2-nowWeek

    let showDayLength = nowWeek < 5 ? 36 : 36 // 如果4行能顯示下一個月，就只顯示4行
    // 迴圈取得日曆上顯示的日期
    for (let i = startDay; i < startDay + showDayLength; i++) {
      let date = new Date(new Date(nowMonthFirstDate).setDate(i)) // 取得時間的對象
      let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() // 小於9的數字前面加0
      let dayObject = {
        date: this.getDateString(date),
        day,
        className: '',
      }
      // new Date(str).toDateString() === new Date().toDateString()

      if (initData && initData.length > 0) {
        for (let i = 0; i < initData.length; i++) {
          if (
            date.toDateString() ===
            new Date(initData[i].act_time).toDateString()
          ) {
            console.log('active day')
            dayObject.className = 'yen-order-day'
          }
        }
      }

      if (date.toDateString() === new Date().toDateString()) {
        console.log('same day')
        dayObject.className = 'yen-today'
      }
      newDateList.push(dayObject)
    }

    console.log('newDateList', newDateList)

    this.setState((pre) => {
      return {
        dayList: newDateList,
        currentDay: nowDate.getDate(),
        currentMonth:
          nowDate.getMonth() + 1 >= 10
            ? nowDate.getMonth() + 1
            : '0' + (nowDate.getMonth() + 1),
        currentYear: nowDate.getFullYear(),
      }
    })
  }

  renderHeader() {
    return (
      <div>
        {this.state.currentMonth}
        <br />月
      </div>
    )
  }

  renderBody() {
    return (
      <div className="yen-signup-calendar-day">
        {this.state.dayList.map((dayObject, index) => {
          return (
            <div className={`yen-signup-calendar-date ${dayObject.className}`}>
              <div key={index}>{dayObject.day}</div>
            </div>
          )
        })}
      </div>
    )
  }

  renderArrowRight() {
    return (
      <div className="yen-signup-arrow-right" onClick={this.preMonth}>
        <SvgArrowRight />
      </div>
    )
  }

  renderArrowLeft() {
    return (
      <div className="yen-signup-arrow-left" onClick={this.nextMonth}>
        <SvgArrowRight />
      </div>
    )
  }

  render() {
    return (
      <div className="yen-calendar">
        <div className="yen-signup-moon-box">
          <div className="yen-signup-moon">
            <div className="yen-signup-moon-month"></div>
            <div className="yen-signup-moon-text">{this.renderHeader()}</div>
            <div className="yen-yellow-bug">
              <SvgYellowBug />
            </div>
          </div>
        </div>

        <div className="yen-signup-calendar-box">
          {this.renderBody()}
          <div className="yen-signup-arrow-box">
            {/* 上個月 */}
            {this.renderArrowRight()}
            {/* 下個月 */}
            {this.renderArrowLeft()}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ActCalendar)
