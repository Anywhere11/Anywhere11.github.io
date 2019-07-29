// 引入样式
import './index.scss'

import React, { Component } from 'react'
import { Header } from '~/components/header'

import { Carousel } from 'antd-mobile';


import { http } from '&'

export class Home extends Component {
    constructor() {
        super()
        this.state = {
            bannerList: [],
            newList: [],
            newGuide: [],
            newMv: [],
        }
    }


    banner = () => {
        http.get('/banner', {
            params: {
                type: 1
            }
        })
            .then(response => {
                this.setState({
                    bannerList: response.data.banners
                })
            })
    }

    newList = () => {
        http.get('/top/album', {
            params: {
                limit: 6

            }
        })
            .then(response => {

                this.setState({
                    newList: response.data.albums
                })
            })
    }

    newGuide = () => {
        http.get('/personalized', {
            params: {
                limit: 6

            }
        })
            .then(response => {

                this.setState({
                    newGuide: response.data.result
                })
            })

    }
    newMv = () => {
        http.get('/top/mv', {
            params: {
                limit: 5

            }
        })
            .then(response => {

                this.setState({
                    newMv: response.data.data
                })
            })

    }
    goToPlayList = (id) =>{
        this.props.history.push('/playlist/' + id) 
    }

    goToMvDetail = (id) =>{
        this.props.history.push('/video/' + id) 
    }




    render() {
        const { bannerList, newList, newGuide, newMv } = this.state
        console.log(1, newGuide)
        return (

            <div>

                <Header title='首页' showBack={true}/>

                <Carousel
                    autoplay={true} infinite
                    style={{marginTop:'.9rem'}}
                >
                    {bannerList.map((item, index) => (

                        <img
                            key={index}
                            src={item.pic}
                            alt=""
                            style={{ width: '100%' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                // this.setState({ imgHeight: 'auto' });
                            }}
                        />

                    ))}
                </Carousel>


                <div className="home-new-guide">
                    <h3>推荐歌单</h3>
                    <div className="home-guide-list">
                        {newGuide.map((item, index) => (
                            <div className="home--guide-img" key={index} onClick={() => this.goToPlayList(item.id)}>
                                <h4>
                                    <img 
                                        src={item.picUrl}
                                    />

                                    <span>
                                        <i className="iconfont icon-bofangsanjiaoxing"></i>
                                        {(item.playCount / 10000) > 1 ? (item.playCount / 10000).toFixed(1) + '万' : Math.round(item.playCount)}
                                    </span>
                                </h4>
                                <p>{item.name}</p>
                            </div>

                        ))}

                    </div>
                </div>


                <div className="home-newlist">
                    <h3>新碟精选</h3>
                    <div className="home-newbox">
                        {newList.map((item, index) => (
                            <div className="home-newitem" key={index}>
                                <h4>
                                    <img
                                        src={item.blurPicUrl}
                                    />
                                </h4>
                                <p>{item.name}</p>
                            </div>

                        ))}

                    </div>


                </div>



                <div className="home-new-mv">
                    <h3>推荐MV</h3>
                    <div className="home-guide-mv" >
                        {newMv.map((item, index) => (
                            <div className="home-img-mv" key={index} onClick={()=>this.goToMvDetail(item.id)}>
                                <h4>
                                    <img
                                        src={item.cover}
                                    />
                                </h4>
                                <div className="home-img-size">
                                    <p>{item.name}</p>
                                    <h5>{item.artistName}</h5>
                                    <span>{item.alias}</span>
                                </div>
                            </div>

                        ))}

                    </div>
                </div>
            </div>
        )
    }


    componentDidMount() {

        this.banner()
        this.newList()
        this.newGuide()
        this.newMv()
    }
}

