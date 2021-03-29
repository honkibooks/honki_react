import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

// components
import '../styles/yen-index.scss'
import SvgCircle from './svg/SvgCircle'
import SvgLadybug from './svg/SvgLadybug'
import SvgRun from './svg/SvgRun'
import ActEvent from '../pages/ActEvent'

function IndexHot(props) {
  const [clickEvent, setClickEvent] = useState(false)
  const [cardSid, setCardSid] = useState(null)

  // 拖曳
  useEffect(() => {
    const slider = document.querySelector('.items')
    let isDown = false
    let startX
    let scrollLeft

    slider.addEventListener('mousedown', (e) => {
      isDown = true
      slider.classList.add('active')
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
      !clickEvent ? setClickEvent(true) : setClickEvent(false)
    })

    slider.addEventListener('mouseleave', () => {
      isDown = false
      slider.classList.remove('active')
    })

    slider.addEventListener('mouseup', () => {
      isDown = false
      slider.classList.remove('active')
    })

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return //stop the fn running
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = x - startX
      slider.scrollLeft = scrollLeft - walk
    })
  }, [])
  let urlPage = props.location.search
  if (urlPage === '?page=1') {
    urlPage = '?page=1'
  }
  // console.log('IndexHot', props)

  function linkCard() {
    if (clickEvent) {
      setTimeout(() => {
        props.history.push('/activity/event/' + cardSid)
      }, 1000)
    }
  }

  const hoverCard = (
    <>
      {props.hotLists.rows &&
        props.hotLists.rows.map((value, index) => {
          const pic =
            'http://localhost:3000/images/yen/event/' +
            value.act_name +
            '/0.jpg'

          return (
            <div
              className="yen-hot-cards-s yen-hover-box item"
              key={index}
              onDoubleClick={() => {
                setTimeout(() => {
                  props.history.push('/activity/event/' + value.act_sid)
                }, 1000)
              }}
              onTouchEnd={() => {
                setCardSid(value.act_sid)
                linkCard()
              }}
            >
              <div className="yen-hot-cover-box d-flex">
                <div className="yen-hot-cover">
                  <img className="yen-hot-cards-img" src={pic} alt="" />
                  <div className="yen-hot-cover-text d-none">
                    <ActEvent />
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
      <div
        className="yen-overflow-box"
        style={{
          display: props.location.search !== '?page=1' ? 'none' : 'block',
        }}
      >
        <div className="yen-hot">
          <div className="yen-title-box d-flex">
            <div className="yen-circle">
              <SvgCircle />
            </div>
            <span className="yen-title-text">熱門活動</span>
          </div>
          <div className="yen-hot-card-box items">
            {hoverCard}
            <div className="yen-hot-ladybug">
              <SvgLadybug />
            </div>
          </div>
          <div className="yen-hot-run">
            <SvgRun />
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(IndexHot)
