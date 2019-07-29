//引入样式
import './index.scss'

import React, { Component } from 'react'
import { Header } from '~/components/header'

import { http, axios } from '&'
import { List, InputItem, Toast } from 'antd-mobile';


export class Comment extends Component {
    constructor() {
        super()
        this.state = {
            songId: "",
            songDetail: {},
            commentList: [],


        }
    }

    // 通过ID获取歌曲
    getSongInfo = (id) => {
        http.get('/song/detail', {
            params: {
                ids: id
            }
        })
            .then(response => {
                this.setState({
                    songDetail: response.data.songs[0]
                })
            })
    }

    // 获取评论列表
    getCommentList = (id) => {
        axios.post('/comment/list', {
            id
        })
            .then(response => {
                // 将ISO时间改为东八区时间
                const list = response.data.list.map(item => {
                    item.date = this.getTimeStamp(item.date)
                    return item
                })

                this.setState({
                    commentList: list
                })
            })
    }



    //发表评论
    postComment = () => {
        const token = localStorage.token
        const songId = this.props.match.params.id
        const value = this.ipt.state.value

        if (token) {
            axios.post('/comment/add', {
                txt: value,
                songId
            })
                .then(response => {
                    const { code, msg, list } = response.data

                    if (code == 1) {
                        Toast.success(msg)

                        // 将ISO时间改为东八区时间
                        const arr = list.map(item => {
                            item.date = this.getTimeStamp(item.date)
                            return item
                        })
                        this.setState({
                            commentList: arr
                        })
                        // 清除输入框
                        this.ipt.clearInput()
                    }
                })
        } else {
            Toast.fail('请登录')
        }
    }


    // 获取时间

    getTimeStamp = (time) => {
        const year = Number(time.substring(0, 4))
        const month = Number(time.substring(5, 7))
        let day = Number(time.substring(8, 10))
        let hour = Number(time.substring(11, 13)) + 8
        const minute = Number(time.substring(14, 16))
        const second = Number(time.substring(17, 19))

        if (hour > 24) {
            hour = hour - 24
            day = day + 1
        }
        return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
    }

    // 改变键盘ENTER时间

    handleEnterKey = (e) => {
        if (e.keyCode == 13) {
            this.postComment()
        }
    }
 
    // 删除数据
    deleteList = (id, index) => {
        axios.post('/comment/delete/', {
            id
        })
            .then(response => {
                const { code, msg } = response.data
                if (code == 1) {

                    this.state.commentList.splice(index, 1)

                    this.setState({
                        commentList: this.state.commentList
                    })

                    Toast.success(msg)


                }

            })


    }


    render() {
        const { songDetail, commentList } = this.state
        console.log(commentList)
        return (
            <div>
                <Header title='评论' showBack={true} />

                <div className="comment-list">
                    <div className="comment-left">
                        {
                            songDetail.al && <img src={songDetail.al.picUrl} alt="" />
                        }
                    </div>
                    <ul className="comment-right">
                        <li>
                            <i className="iconfont icon-MUSIC"></i>
                            {songDetail.name}
                        </li>

                        {
                            songDetail.ar && <li>
                                <i className="iconfont icon-ren"></i>
                                {
                                    songDetail.ar.map((item, index) => {
                                        return (
                                            <span key={index}>{item.name}</span>
                                        )
                                    })
                                }
                            </li>

                        }
                        {

                            songDetail.al && <li>
                                <i className="iconfont icon-24gl-musicAlbum"></i>
                                {songDetail.al.name}</li>
                        }


                    </ul>


                </div>

                <div className="comment-input">
                    <InputItem
                        placeholder="请输入评论"
                        clear
                        ref={el => this.ipt = el}
                        style={{ paddingRight: '1.2rem' }}
                    ></InputItem>

                    <i className="iconfont icon-send" onClick={() => this.postComment()}></i>
                </div>

                <div className="comment-inputItem">
                    <div className="comment-inputList">
                        {
                            commentList.map((item, index) => {

                                return (
                                    <div className='comment-list-item' key={index}>
                                        <h3>
                                            <span>用户：{item.username}</span>
                                            <span>发表时间：{item.date}</span>
                                        </h3>

                                        <h4>
                                            <p>{item.content}</p>
                                            <i className="iconfont icon-icon1" onClick={() => this.deleteList(item._id, index)}></i>
                                        </h4>
                                    </div>
                                )

                            })

                        }
                    </div>
                </div>

            </div>

        )
    }

    componentDidMount() {
        // 获取地址栏参数
        const id = this.props.match.params.id
        this.getSongInfo(id)
        this.getCommentList(id)

        document.addEventListener('keypress', this.handleEnterKey)

        // 存放地址栏参数
        this.setState({
            songId: id
        })
    }
    componentWillMount() {
        document.removeEventListener("keypress", this.handleEnterKey)
    }
}


