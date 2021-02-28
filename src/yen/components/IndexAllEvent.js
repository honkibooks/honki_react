import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'

// components
import '../styles/yen-index.scss'
import SvgLadybug from './svg/SvgLadybug'
import SvgSlide from './svg/SvgSlide'
import ActPagination from './ActPagination'

function IndexAllEvent(props) {
  // console.log('eventCard.props:', props)

  // 頁數
  const {
    totalPages,
    page,
    setPage,
    queryPage,
    setQueryPage,
    queryClass,
    setQueryClass,
  } = props

  // 篩選按鈕
  function classButtonClick(changeClass) {
    // console.log('class', changeClass)
    setQueryClass(changeClass)
  }

  // console.log('IndexAllEvent props', props.eventLists)
  const classNumList = [
    '講座',
    '讀書會',
    '戶外探索',
    '休閒活動',
    '活動地區',
    '節氣推薦',
  ]

  const eventCard = (
    <>
      {props.eventLists.rows &&
        props.eventLists.rows.map((value, index) => {
          const pic =
            'http://localhost:3000/images/yen/event/' +
            value.act_name +
            '/0.jpg'

          return (
            <div
              className="yen-event-card"
              key={index}
              onClick={() => {
                props.history.push('/activity/event/' + value.act_sid)
              }}
            >
              <div className="yen-new-card-img">
                <img src={pic} alt="" />
              </div>
              <div className="yen-new-card-tag d-flex">
                <div className="yen-event-card-tagl">
                  <span>{moment(value.act_time).format('YYYY-MM-DD')}</span>
                </div>
                <div className="yen-event-card-tagr">
                  <span>{classNumList[parseInt(value.act_class_sid) - 1]}</span>
                </div>
              </div>
              <div className="yen-new-card-des">
                <div className="yen-event-card-title">
                  <span>{value.act_name}</span>
                </div>
                <div className="yen-new-card-bottom">
                  <div className="yen-event-card-location">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{value.event_city}</span>
                  </div>
                  <div className="yen-event-card-price">
                    <div className="yen-event-card-nt">
                      <span>NT</span>
                    </div>
                    <div className="yen-event-card-money">
                      <span>{value.act_price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </>
  )

  return (
    <>
      <div className="yen-event">
        <nav aria-label="breadcrumb" className="yen-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-honki">
              <Link to="/">首頁</Link>
            </li>
            <li className="active" aria-current="page">
              活動講座
            </li>
          </ol>
        </nav>
        <div className="yen-select">
          <button
            className="btn-md-light yen-select-btn"
            onClick={() => {
              props.history.push('/activity?changeClass=talk')
              const changeClass = '?changeClass=talk'
              classButtonClick(changeClass)
            }}
          >
            講座
          </button>
          <button
            className="btn-md-light yen-select-btn"
            onClick={() => {
              props.history.push('/activity?changeClass=book_club')
              const changeClass = '?changeClass=book_club'
              classButtonClick(changeClass)
            }}
          >
            讀書會
          </button>
          <button
            className="btn-md-light yen-select-btn"
            onClick={() => {
              props.history.push('/activity?changeClass=outdoor')
              const changeClass = '?changeClass=outdoor'
              classButtonClick(changeClass)
            }}
          >
            戶外探索
          </button>
          <button
            className="btn-md-light yen-select-btn"
            onClick={() => {
              props.history.push('/activity?changeClass=hang_out')
              const changeClass = '?changeClass=hang_out'
              classButtonClick(changeClass)
            }}
          >
            休閒活動
          </button>
          <button
            className="btn-md-light yen-select-btn"
            onClick={() => {
              props.history.push('/activity?changeClass=area')
              const changeClass = '?changeClass=area'
              classButtonClick(changeClass)
            }}
          >
            活動地區
          </button>
          <button
            className="btn-md-light yen-select-btn"
            onClick={() => {
              props.history.push('/activity?changeClass=recommend')
              const changeClass = '?changeClass=recommend'
              classButtonClick(changeClass)
            }}
          >
            節氣推薦
          </button>
          <div className="yen-event-ladybug">
            <SvgLadybug />
          </div>
        </div>
        <div className="yen-allevent">
          <div className="yen-event-wrap">{eventCard}</div>
        </div>
        <div className="yen-pages">
          <ActPagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            queryPage={queryPage}
            setQueryPage={setQueryPage}
            queryClass={queryClass}
            setQueryClass={setQueryClass}
          />
        </div>
        <div className="yen-slide">
          <SvgSlide />
        </div>
      </div>
    </>
  )
}

export default withRouter(IndexAllEvent)
