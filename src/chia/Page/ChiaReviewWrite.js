import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../Style/chiareviewwrite.scss'
import $ from 'jquery'

function ChiaReviewWrite() {
  const [dataLoading, setLoading] = useState(false)
  const [reviewnickname, setReviewNickname] = useState('')
  const [reviewcategory, setReviewCategory] = useState('')
  const [reviewbooktitle, setReviewBooktitle] = useState('')
  const [reviewRanking, setReviewRanking] = useState('')
  const [reviewContent, setReviewContent] = useState('')

  const solarterm = [
    '立春',
    '雨水',
    '驚蟄',
    '春分',
    '清明',
    '穀雨',
    '立夏',
    '小滿',
    '芒種',
    '夏至',
    '小暑',
    '大暑',
    '立秋',
    '處暑',
    '白露',
    '秋分',
    '寒露',
    '霜降',
    '立冬',
    '小雪',
    '大雪',
    '冬至',
    '小寒',
    '大寒',
  ]

  useEffect(() => {
    $('.chia_rankingselect').on('change', function () {
      setReviewRanking(this.value)
    })
    $('.chia_solarselect ').on('change', function () {
      setReviewCategory(this.value)
    })
  }, [])

  async function addReview() {
    const newData = {
      reviewnickname,
      reviewcategory,
      reviewbooktitle,
      reviewRanking,
      reviewContent,
    }
    const url = 'http://localhost:3333/reviews/edit/add'

    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    console.log(JSON.stringify(newData))

    const response = await fetch(request)
    const data = await response.json()

    console.log('This is the result', data)
  }

  const selectbar = (
    <>
      {solarterm.map((v, i) => (
        <option className="chia_solarselect" value={v} key={i}>
          {v}
        </option>
      ))}
    </>
  )

  console.log(reviewnickname)
  console.log(reviewbooktitle)
  console.log(reviewContent)
  console.log(reviewRanking)
  console.log(reviewcategory)

  return (
    <>
      <div class="chia_reviewwrite">
        <div class="container-fluid">
          <div class="bread row">
            <div class="breadbox">
              <Link to="#">首頁</Link>
              <Link to="#">讀者感言</Link>
              <Link to="#">撰寫心得</Link>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="chia_contentbox d-flex justify-content-center">
            <div class="chia_contentborder-r  d-flex justify-content-center align-items-center">
              <form
                action=""
                className="chia_contentborder-l d-flex justify-content-center chia_form"
                method="javascript:"
              >
                <div class="form-box d-flex flex-column">
                  <div class="form-group .e-m chia_form_g">
                    <label for="" className="chia_member">
                      會員名稱
                    </label>
                    <br />
                    <input
                      type="text"
                      value={reviewnickname}
                      onChange={(e) => {
                        setReviewNickname(e.target.value)
                      }}
                    />
                  </div>
                  <div className="form-group .e-m chia_form_g">
                    <label for="" className="chia_e-title">
                      標題
                    </label>
                    <br />
                    <input
                      type="text"
                      style={{ width: '545px' }}
                      value={reviewbooktitle}
                      onChange={(e) => {
                        setReviewBooktitle(e.target.value)
                      }}
                    />
                  </div>
                  <div className="chia_selectionbar d-flex justify-content-between">
                    <div className="chia_category d-flex">
                      <label className="chia_categorysolar">節氣</label>
                      <select
                        name=""
                        id=""
                        className="chia_solarselect chia_select"
                      >
                        {selectbar}
                      </select>
                    </div>
                    <div className="chia_category d-flex">
                      <label className="chia_categoryranking">評分</label>
                      <select
                        name=""
                        id=""
                        className="chia_rankingselect chia_select"
                      >
                        <option className="chiaranking" value="5">
                          5&#9733;
                        </option>
                        <option className="chiaranking" value="4">
                          4&#9733;
                        </option>
                        <option className="chiaranking" value="3">
                          3&#9733;
                        </option>
                        <option className="chiaranking" value="2">
                          2&#9733;
                        </option>
                        <option className="chiaranking" value="1">
                          1&#9733;
                        </option>
                      </select>
                    </div>
                  </div>

                  <textarea
                    name="review"
                    id=""
                    className="chia_reviewarea"
                    cols="30"
                    rows="15"
                    onChange={(e) => {
                      setReviewContent(e.target.value)
                    }}
                  ></textarea>
                  <button
                    className="chia_reviewtbtn mx-auto"
                    onClick={() => {
                      addReview()
                    }}
                  >
                    送出
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChiaReviewWrite
