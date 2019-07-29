//引入样式
import './index.scss'

import React, { Component } from 'react'
import { Header } from '~/components/header'

import { Tabs, Toast } from 'antd-mobile'

import { http, getQuery, axios } from '&'

import { Slider, WingBlank, WhiteSpace } from 'antd-mobile';


export class Play extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            songUrl: {},
            songDetail: {},
            songLyric: {},
            value: "",
            playedTime: "",
            musicStart: "",
            musicEnd: "",
            isLoop: false,
            isLike: false,

        }
    }


    // 给数字加0
    addZero = (num) => {
        return num < 10 ? '0' + num : num
    }

    //获取歌曲信息
    getSongInfo = (id) => {
        http.get('/song/url', {
            params: {
                id
            }

        })
            .then(response => {
                this.setState({
                    songUrl: response.data.data[0]
                })

                // 监听音乐时间更新
                const audio = this.audio

                audio.addEventListener('timeupdate', () => {

                    const percent = (audio.currentTime / audio.duration) * 100

                    if (Math.abs(audio.currentTime - this.state.playedTime) > 0.8) {
                        this.setState({
                            value: percent,
                            musicStart: `${Math.floor(audio.currentTime / 60)}:${this.addZero(Math.floor(audio.currentTime % 60))}`,
                            playedTime: audio.currentTime,
                            musicEnd: `${Math.floor(audio.duration / 60)}:${this.addZero(Math.floor(audio.duration % 60))}`

                        })
                    }

                })


                // 监听播放状态

                audio.addEventListener('play', () => {
                    const img = this.img
                    const myIcon = this.myIcon

                    if (img && myIcon) {
                        img.className = 'rotate play'
                        myIcon.className = 'iconfont icon-suspend_icon'
                    }


                })
                audio.addEventListener('pause', () => {
                    const img = this.img
                    const myIcon = this.myIcon

                    if (img && myIcon) {
                        img.className = 'rotate pause'
                        myIcon.className = 'iconfont icon-bofang'

                    }


                })

            })

    }

    // 点击进度条

    clickOnProgress = (per) => {
        const audio = this.audio

        if (audio.currentTime !== 0) {
            audio.currentTime = (audio.duration) * per / 100
        }
    }

    getSongDetail = (ids) => {
        http.get('/song/detail', {
            params: {
                ids
            }

        })
            .then(response => {

                this.setState({
                    songDetail: response.data.songs[0]
                })

            })
    }


    getSongLyric = (id) => {
        http.get('/lyric', {
            params: {
                id
            }
        })
            .then(response => {

                this.setState({
                    songLyric: response.data.lrc
                })

            })
    }


    toggle = () => {
        const audio = this.audio

        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }

    }

    // 单曲循环
    changeLoop = (flag) => {
        this.setState({
            isLoop: !flag
        })
    }

    // 点击快进
    changeForward = () => {
        const audio = this.audio
        audio.currentTime = audio.currentTime + 10
    }

    // 点击后退
    changeBackward = () => {
        const audio = this.audio
        audio.currentTime = audio.currentTime - 10
    }

    // 收藏
    like = (flag) => {

        const token = localStorage.token
        const id = this.props.match.params.id

        if (token && id) {
            axios.post('/like/change', {
                id,
                flag: !flag
            })
                .then(response => {
                    const { code } = response.data
                    if (code == 1) {
                        this.setState({
                            isLike: !flag
                        })
                    }

                })
        } else {
            Toast.fail('请登录')
        }

    }

    getIsLike = (id) => {
        axios.post('/like/status', {
            id
        })
            .then(response => {
                const { code, isLike } = response.data
                if (code == 1) {

                    this.setState({
                        isLike:isLike
                    })

                    console.log(1,response.data,isLike)
                }
            })

    }

    goToComment = (id) => {
        this.props.history.push('/comment/' + id)
    }



    render() {
        // 取地址栏参数
        const { title, songUrl, songDetail, songLyric, value, musicStart, musicEnd, isLoop, isLike } = this.state
        console.log(isLike)
        return (
            <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: `url(${require('@/assets/img/background.jpg')})`, backgroundSize: '100% 100%', position: "relative" }}>
                <Header title={title} showBack={true} />

                <div className="song-music">
                    <audio
                        src={songUrl.url}
                        // id="myAudio" 
                        ref={el => this.audio = el}
                        autoPlay
                        loop={isLoop}
                    // controls
                    ></audio>

                </div>

                <div className="disk-music">
                    <h3>
                        {
                            songDetail.al && <img onClick={this.toggle} src={songDetail.al.picUrl} alt="" ref={el => this.img = el} />
                        }
                    </h3>
                </div>

                <div className="disk-list">
                    <div className="disk-font">
                        <i onClick={() => this.like(isLike)} className={isLike ? "iconfont icon-heart" : "iconfont icon-shoucang1"} style={{ color: isLike ? "red" : "white" }}></i>
                        <i className="iconfont icon-ziyuan"></i>
                        <i className="iconfont icon-leaf"></i>
                        <i className="iconfont icon-xinxi" onClick={() => this.goToComment(this.props.match.params.id)}></i>
                        <i onClick={this.goToComment} className="iconfont icon-dots-vertical"></i>

                    </div>

                    <div className="disk-time">
                        <span>{musicStart}</span>
                        <Slider
                            defaultValue={0}
                            min={0}
                            max={100}
                            value={Number(value)}
                            onChange={(val) => this.clickOnProgress(val)}
                            trackStyle={{ backgroundColor: "#eee" }}
                            railStyle={{ backgroundColor: "rgba(255,245,247,.3)" }}
                            handleStyle={{ width: '.2rem', height: '.2rem', marginTop: -4, marginLeft: -1, borderColor: '#fff' }}

                        />
                        <span>{musicEnd}</span>
                    </div>


                    <div className="disk-name">
                        <i onClick={() => this.changeLoop(isLoop)} className="iconfont icon-caozuo-xunhuan1" style={{ color: isLoop ? '#fff' : '#bbb' }}></i>
                        <i onClick={() => this.changeBackward()} className="iconfont icon-play-prev-" ></i>
                        <i ref={el => this.myIcon = el} onClick={this.toggle} className="iconfont icon-bofang"></i>
                        <i className="iconfont icon-play-next-" onClick={this.changeForward}></i>
                        <i className="iconfont icon-playlist"></i>

                    </div>



                </div>


            </div>
        )
    }



    componentDidMount() {
        // 获取地址栏参数
        const id = this.props.match.params.id
        this.getSongInfo(id)
        this.getSongDetail(id)
        this.getSongLyric(id)
        this.getIsLike(id)

        const query = getQuery(this.props.location.search)
        // 存放地址栏参数
        this.setState({
            title: query.name
        })


    }
}