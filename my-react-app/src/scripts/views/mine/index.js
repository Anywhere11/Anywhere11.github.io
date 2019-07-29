// 引入样式
import './index.scss'

import React, { Component } from 'react'
import { Header } from '~/components/header'


import { Link } from 'react-router-dom'

import { Toast } from 'antd-mobile'

import { observer } from 'mobx-react'
import User from '~/mobx/user.js'

import { http, axios } from '&'


@observer
class Mine extends Component {
    constructor() {
        super()
        this.state = {
            tabList: [
                { txt: '口袋铃声', icon: 'icon-icon--' },
                { txt: '我的订单', icon: 'icon-dingdan2' },
                { txt: '优惠卷', icon: 'icon-wodeyouhuijuan' },
                { txt: '加入网易音乐人', icon: 'icon-yinle' },
                { txt: '分享网易云音乐', icon: 'icon-fenxiang' },
                { txt: '在线听歌免流量', icon: 'icon-icon_zhibo-xian' },
                { txt: '音乐闹钟', icon: 'icon-naozhong' },
                { txt: '关于', icon: 'icon-about' },
            ]

        }
    }

    uploadFile = () => {
        this.ipt.click()
    }

    uploadAvatar = () => {
        const data = new FormData
        const file = this.ipt.files[0]
        data.append('avatar', file)


        axios({
            url: '/user/uploadAvatar?token=' + localStorage.token,
            method: 'POST',
            data: data,
            contentType: false,
            processData: false
        })
            .then(response => {
                const url = response.data.avatarUrl.replace('public/', 'http://123.57.211.31:8883/')
                User.updateUserAvatar(url)
            })
    }

    logOut=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('count')

        User.updateUserInfo({
            isLogin:false,
            mobile:'',
            avatar:'',
            token:''
        })

        Toast.offline('已退出登陆')
    }

    render() {
        const {tabList} = this.state




        let { userInfo: { isLogin, mobile } } = User

        const avatar = User.userInfo.avatar.replace('public/', 'http://123.57.211.31:8883/')

        return (
            <div>
                <Header title='我' showBack={true} />

                {/* 用户信息 */}
                {
                    isLogin &&
                    <div className='mine-info'>

                        <div className='mine-avatar'>
                            <img src={avatar} alt="" />
                            <span onClick={this.uploadFile}>上传头像</span>
                            <input type="file" accept='image/*' ref={el => this.ipt = el} onChange={this.uploadAvatar} style={{ display: 'none' }} />
                        </div>

                        <div className='mine-name'>
                            <p>{mobile}</p>
                            <span>手机认证用户</span>
                        </div>

                    </div>
                }


                {
                    !isLogin &&
                    <div className='mine-null'>
                        <h3><i className='iconfont icon-gerenzhongxin'></i></h3>
                        <Link to='/login'>前往登入</Link>
                    </div>
                }


                <div className="mine-msg">
                    <ul className="mine-list-buy">
                        <li>
                            <i className="iconfont icon-xiaoxi"></i>
                            <span>消息</span>
                        </li>
                        <li>
                            <i className="iconfont icon-store_icon"></i>
                            <span>商城</span>
                        </li>
                        <li>
                            <i className="iconfont icon-rili"></i>
                            <span>演出</span>
                        </li>
                        <li>
                            <i className="iconfont icon-pifuguanli"></i>
                            <span>个性换肤</span>
                        </li>
                    </ul>

                </div>

              
                <ul className="mine-tab">
                    {
                        tabList.map((item,index)=>{
                            return(
                                <li key={index}>
                                    <i className={'iconfont ' + item.icon}></i>
                                    <span>{item.txt}</span>
                                    <i className="iconfont icon-552cc1babd9aa"></i>

                                </li>
                            )
                        })
                    }
                </ul>

                {
                    isLogin && <div  className='mine-logout' onClick={this.logOut}>立即注销</div>
                }


            </div>
        )
    }


    componentDidMount() {
        // 取token
        // if (localStorage.token) {
        //     const { userInfo , updateUserAvatar } = User
        //     if(userInfo.avatar) {

        //     }else{
        //         const url = require('@/assets/img/avatar.jpg')
        //         updateUserAvatar(url)
        //         this.setState({
        //             avatar:url
        //         })
        //     }

        // } else{
        //     Toast.offline('请前往登入')
        // }
    }
}

export default Mine