// 引入样式
import './index.scss'

import React, { Component } from 'react'
import { Header } from '~/components/header'

import { Tabs } from 'antd-mobile'

import { http } from '&'

export class Singer extends Component {
    constructor() {
        super()
        this.state = {
            artist: {},
            hotSongs: [],
            tabs: [
                { title: '热门单曲' },
                { title: '艺人简介' }
            ]
        }
    }

    getSingerInfo = (id) => {
        http.get('/artists', {
            params: {
                id

            }
        })
            .then(response => {
                this.setState({
                    artist: response.data.artist,
                    hotSongs: response.data.hotSongs
                })

            })

    }


    // 将参数放在地址栏上 带到下一个页面
    goToPlay = (id, name) => {

        this.props.history.push('/play/' + id + '?name=' + name)

    }





    render() {
        const { artist, hotSongs, tabs } = this.state

        return (
            <div>
                <Header title='歌手' showBack={true} />
                <div className="singer-list">
                    <h3>
                        <img src={artist.picUrl} />
                    </h3>

                    <div className="singer-class" >
                        <h5>{artist.name}</h5>
                        <span>{artist.albumSize}张专辑|{artist.musicSize}首单曲|{artist.mvSize}支MV</span>
                    </div>

                </div>


                <div className="singer-hot" >


                    <Tabs
                        tabs={tabs}
                    >

                        <div className="singer-list-demo">
                            {hotSongs.map((item, index) => ( 
                                        //    点击事件，通过地址栏传值 在路由里面设置通过ID传值，需传两个值，所以取两个ID
                                <div className="singer-guide" key={index} onClick={() => this.goToPlay(item.id, item.name)} >
                                    <h3><img src={item.al.picUrl} /></h3>
                                    <div className="singer-detail">
                                        <div>
                                            <h4>{item.name}</h4>
                                            <h5>{item.al.name}</h5>
                                        </div>
                                        <i className='iconfont icon-icon_zhibo-xian'></i>
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div className='singer-desc'>{artist.briefDesc}</div>

                    </Tabs>

                </div>




            </div>
        )
    }

    componentDidMount() {
        const id = this.props.match.params.id

        this.getSingerInfo(id)

    }
}