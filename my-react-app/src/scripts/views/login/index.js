// 引入样式
import './index.scss'

// 引入小组件

import React, { Component } from 'react'
import User from '~/mobx/user.js'



// 引入UI库
import { WingBlank, WhiteSpace, InputItem, Button, List, Toast } from 'antd-mobile';

// import { axios } from "&"
import axios from 'axios'

import { Header } from '~/components/header'


let timer = null
let mobileReg = /^1(3|5|7|8|9)\d{9}$/
let codeReg = /^\d{4}$/


export class Login extends Component {
    constructor() {
        super()
        this.state = {
            // 验证码按钮不可点击
            codeBtnDis: true,
            // 登陆按钮不可点击
            loginBtnDis: true,
            // 是否在验证码倒计时期间
            isChecking: false,
            showMsg: '获取验证码',
            countDown: 60,
            avatarUrl: require("@/assets/img/img.jpg"),
            backUrl: require("@/assets/img/img3.jpg"),
        }
    }

    // 正则验证手机号
    regCheckMobile = (mobile) => {
        let code = this.code.state.value



        // 输入手机号或者验证码的时候都需要判定是否能够点击登陆


        // 如果在验证码倒计时期间 不对手机号进行验证
        if (!this.state.isChecking) {
            this.setState({
                codeBtnDis: !mobileReg.test(mobile),
                loginBtnDis: !(mobileReg.test(mobile) && codeReg.test(code))

            })
        }
    }
    // 正则验证验证码
    regCheckCode = (code) => {
        let mobile = this.mobile.state.value

        this.setState({
            loginBtnDis: !(mobileReg.test(mobile) && codeReg.test(code))
        })
    }

    // 开始计时
    startCountDown = () => {
        this.sendCode()

        timer = setInterval(() => {
            if (this.state.countDown > 0) {
                this.setState({
                    codeBtnDis: true,
                    countDown: --this.state.countDown,
                    showMsg: `剩余${this.state.countDown}秒`,
                    isChecking: true

                })
            } else {
                clearInterval(timer)
                timer = null

                this.setState({
                    codeBtnDis: false,
                    countDown: 60,
                    showMsg: '获取验证码',
                    isChecking: false
                })
            }
        }, 1000)
    }
    sendCode = () => {
        let mobile = this.mobile.state.value

        axios.post('/verify/sendCode', {
            mobile
        })
            .then((response) => {

                const { code, msg } = response.data

                if (code === 1) {
                    Toast.success(msg)
                } else {
                    Toast.fail(msg)
                }
            })
    }
    // 登陆
    goToLogin = () => {
        let mobile = this.mobile.state.value
        let code = this.code.state.value
        axios.post('/verify/checkCode', {
            mobile,
            randCode: code
        })
            .then(response => {
                const { code, msg, token } = response.data

                if (code == 1) {
                    localStorage.token = token


                    axios.post('user/info', {})
                        .then(response => {
                            const { code, msg, userInfo } = response.data
                            if (code == 1) {
                                const { updateUserInfo } = User

                                if (userInfo.avatar) {
                                    updateUserInfo({
                                        isLogin: true,
                                        mobile: userInfo.username,
                                        avatar: userInfo.avatar,
                                        token: localStorage.token
                                    })

                                } else {
                                    const url = require('@/assets/img/avatar.jpg')

                                    updateUserInfo({
                                        isLogin: true,
                                        mobile: userInfo.username,
                                        avatar: url,
                                        token: localStorage.token,

                                    })

                                }

                            } else {
                                Toast.fail(msg)
                            }
                        })


                    this.props.history.push('/app/mine')
                } else {
                    localStorage.token = null
                    Toast.fail(msg)
                }
            })

    }




    render() {
        const { codeBtnDis, loginBtnDis, showMsg, avatarUrl, backUrl } = this.state
        return (
            <div>

                <Header
                    title='登陆'
                    showBack={true}
                />

                {/* <div className='login-avatar-img'>
                    <img src={avatarUrl} alt="" />
                </div> */}

                <div className='login-back-img'>
                    <img src={backUrl} alt="" />
                </div>

                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem
                            type='tel'
                            placeholder='请输入手机号'
                            clear
                            ref={el => this.mobile = el}
                            onChange={this.regCheckMobile}
                        >手机号</InputItem>

                        <WhiteSpace />

                        <InputItem
                            type='number'
                            placeholder='请输入验证码'
                            ref={el => this.code = el}
                            onChange={this.regCheckCode}
                        >验证码</InputItem>

                        <Button
                            type='warning'
                            inline
                            className='login-code'
                            disabled={codeBtnDis}
                            onClick={this.startCountDown}
                        >{showMsg}</Button>

                        <WhiteSpace />

                        <Button
                            type='primary'
                            disabled={loginBtnDis}
                            onClick={this.goToLogin}
                        >马上登入</Button>
                    </List>
                </WingBlank>
            </div>

        )
    }
}
