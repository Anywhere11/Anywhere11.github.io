//引入样式文件
import './index.scss'

//引入axios请求
import { axios } from "&"


// 引入第三方UI库
import { Carousel } from 'antd-mobile';


import React, { Component } from 'react'

let timer = null;

export class Guide extends Component {

    constructor() {
        super()
        this.state = {
            imgList: [
                require("@/assets/img/guide1.jpg"),
                require("@/assets/img/guide2.jpg"),
                require("@/assets/img/guide3.jpg")
            ],
            img: require("@/assets/img/guide4.jpg"),
            first:true,
            countDown:5
        }
    }


    goToApp = () => {
        // 页面跳转清楚定时器
        clearInterval(timer)
        // 跳转页面
        const { history } = this.props;
        history.push("/app/home");
    }


    render() {
        const {first,countDown} =  this.state
        return (
            <div>
                {
                    // 判断是否为第一次进入APP
                    first&&<Carousel
                        autoplay={false}
                    >
                        {/* 循环轮播图 */}
                        {this.state.imgList.map((item, index) => (
                            <div className="guide-index" key={index}>
                                <img
                                    src={item}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                />
                                {/* 显示最后一张图片 */}
                                {
                                    index == this.state.imgList.length - 1 && <span className='guide-loop' onClick={this.goToApp}>进入APP</span>
                                }
                            </div>

                        ))}
                    </Carousel>

                }
                
                {
                    // 获取第二次进入APP图片以及判断是否为第二次进入APP
                    !first&&<div className="guide-index">
                        <img src={this.state.img} alt=""/>
                        <span className='guide-time' onClick={this.goToApp}>跳过{countDown}</span>
                    </div>
                }
            </div>
        )
    }


    // 生命周期函数
    componentDidMount() {
        // 判断是否第一次进入APP
        if(localStorage.count){
            localStorage.count++
            this.setState({
                first:false,
            })

            // 页面加载开启定时器
            timer = setInterval(()=>{
                // 判断是否倒计时
                if(this.state.countDown>1){
                    this.setState({
                        countDown:--this.state.countDown,
                    })

                }else{
                    clearInterval(timer)
                    const { history } = this.props;
                    history.push("/app/home");

                }
            },1000)

        }else{
            localStorage.count = 1
        }

    }
} 