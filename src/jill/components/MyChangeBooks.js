import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// 二手書svg
import NormalBee from './../components/NormalBee'
import ChangeBooksIcon2 from './../components/ChangeBooksIcon2'

// 抓取登入的userId(還沒用)
// const userId = localStorage.getItem('userId')
// console.log(userId)

class MyChangeBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      c_sid: '',

      // book_name: '這裡是書名',
      // ISBN: '這裡是ISBN',
      // book_condition: '有幾成新',
      // written_or_not: '有無塗改',
      // nickname: '持有者',
      // book_pics: '我是圖片',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // 這塊會執行componentDidUpdate的作用(因為setState)
  handleChange(event) {
    console.log('this.proppppp ', this.props)
    const { myrows } = this.props
    // this.setState({ value: event.target.value })
    // 下面的5要怎麼抓到變數
    // this.setState({ ISBN: myrows[5].ISBN })

    // 拷貝一個新的，展開成陣列
    const newMyrows = [...myrows]

    // 不行，ISBN變成Undefined
    const index = newMyrows.findIndex(
      (item) => item.ISBN === event.target.value
    )

    this.setState(myrows[index])

    console.log(myrows)
    // 還要研究!!只能變一次值的寫法，而且只抓到第一筆的資料(編號15會員第一筆)
    // for (let i = 0; i < myrows.length; i++) {
    //   myrows.map((m, i) =>
    //     this.setState({
    //       ISBN: myrows[i].ISBN,
    //       book_condition: myrows[i].book_condition,
    //       written_or_not: myrows[i].written_or_not,
    //       nickname: myrows[i].nickname,
    //     })
    //   )
    // }
    // myrows.map((m, i) => this.setState({ ISBN: myrows[i].ISBN }))
    // myrows.map((m, i) =>
    //   this.setState({ book_condition: myrows[i].book_condition })
    // )
    // myrows.map((m, i) =>
    //   this.setState({ written_or_not: myrows[i].written_or_not })
    // )
    // myrows.map((m, i) => this.setState({ nickname: myrows[i].nickname }))

    console.log(newMyrows)
  }

  // userid傳不到後端
  handleSubmit = (event) => {
    const userId = localStorage.getItem('userId')
    console.log('handleSubmit userId', userId)
    alert('A name was submitted: ' + userId)
    event.preventDefault()
    // 送到後端的資料
    // const data = { tweet: { body: this.state.userId } }
    console.log('this.state.c_sid', this.state.c_sid)
    const url = 'http://localhost:3333/normal-index/random/' + this.state.c_sid

    // let history = this.props.history
    fetch(url, {
      method: 'POST', //PUT會連第一段SQL都跑不出來
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((res) => {
        /*接到request data後要做的事情*/
        console.log('ChangeBook', res)
        window.location.href =
          `http://localhost:3000/RandomSuccess/` + this.state.c_sid
        //更新某一筆資料
        // this.handleServerItemAdd(data)
      })
    // .then((response) => {
    //   this.setState({ userId: response.userId })
    // })
    // .catch((e) => {
    //   /*發生錯誤時要做的事情*/
    // })
    // })
  }

  // 與JS或JQ整合要在這邊，執行順序是class，再來render然後才是這區塊，這邊可以fetch
  componentDidMount() {
    console.log('componentDidMount')
    // document.getElementById('clickme').addEventListener('click', function () {
    //   alert('你按到我了')

    // .then((booksList) => {
    //   this.setState({ books: booksList })

    // })

    const { myrows } = this.props
    // this.setState({ value: event.target.value })
    // 下面的5要怎麼抓到變數
    // this.setState({ ISBN: myrows[5].ISBN })

    // 拷貝一個新的，展開成陣列
    const newMyrows = [...myrows]

    // 不行，ISBN變成Undefined

    this.setState(myrows[0])
  }

  // 卸載
  componentWillUnmount() {
    console.log('componentWillUnmount')
    // document
    //   .getElementById('clickme')
    //   .removeEventListener('click', function () {
    //     alert('再見')
    //   })
  }
  // 已經更新(從父母元件接收到props或setState才會觸發)
  componentDidUpdate() {
    console.log('componentDidUpdate')
    console.log('目前的狀態值是', this.state.value)
  }

  render() {
    // 若要解構賦值要寫在這裡，下面就可以不用打this.props開頭
    const { myrows } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        {/* <label>
          範例
          <select
            value={this.state.value}
            onChange={this.handleChange}
            className="form-control formInput col-7"
            id="exampleFormControlSelect1"
          >
            {myrows.map((m, i) => (
              <option key={i}>{m.book_name}</option>
            ))}
          </select>
        </label>
        <p>您選擇的是：{this.state.value}</p>
        <p>您選擇的是：{this.state.ISBN}</p> */}
        <div className="jill-myNchangelist">
          <div className="form-group ">
            <div className="formItems row d-flex">
              <select
                value={this.state.value}
                onChange={this.handleChange}
                className="form-control formInput col-7"
                id="exampleFormControlSelect1"
              >
                <option selected="true" disabled>
                  請選擇
                </option>
                {/* 成功的寫法在NormalIndex只能撈一筆的時候的寫法，myrows={mybook_rows} */}
                {myrows.map((m, i) => (
                  <option key={i} value={m.ISBN}>
                    {m.book_name}
                  </option>
                ))}
              </select>
              <Link to={'/NormalEdit/' + this.state.c_sid}>
                <button className="btn-md-dark jill-myNchange-add-btn">
                  查看
                </button>
              </Link>
              <Link to="./NormalInsert">
                <button className="btn-md-dark jill-fix-btn-add">新增</button>
              </Link>

              <Link to={'/RandomSuccess/' + this.state.c_sid}>
                <button
                  type="submit"
                  className="btn-md-dark jill-want-btn jill-random-btn"
                  onClick={this.handleSubmit}
                >
                  隨機交換
                </button>
              </Link>
            </div>
          </div>
          {this.state.c_sid ? (
            <div className="jill-myNchange-display d-flex">
              {/* 蜜蜂svg */}
              <NormalBee />
              <img
                src={
                  `http://localhost:3000/images/books/` + this.state.book_pics
                }
                alt=""
              />

              <ul className="">
                <div className="jill-underline"></div>
                <li>{this.state.ISBN}</li>
                <div className="jill-underline"></div>
                <li>{this.state.book_name}</li>
                <div className="jill-underline"></div>
                <li>{this.state.book_condition}</li>
                <div className="jill-underline"></div>
                <li>{this.state.written_or_not}</li>
                <div className="jill-underline"></div>
                <li>{this.state.nickname}</li>
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>
        {/* 要讓它後執行，或給預設值 ，要怎麼抓到myrows的索引值*/}
        {/* <p onChange={this.handleChange}>您的ISBN是：{myrows[5].ISBN}</p> */}
        {/* <button id="clickme">按我</button>
        <input type="submit" value="Submit" /> */}
      </form>
    )
  }
}
// 預設屬性，用在跑出undefined的時候
MyChangeBooks.defaultProps = {
  myrows: '',
}

export default MyChangeBooks
