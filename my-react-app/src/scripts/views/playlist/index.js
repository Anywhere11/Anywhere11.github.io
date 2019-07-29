// 引入样式
import './index.scss'

import React, { Component } from 'react'
import { Header } from '~/components/header'

import { Tabs } from 'antd-mobile'

import { http } from '&'

export class Playlist extends Component {
    constructor() {
        super()
        this.state = {
            playlist: [],
            tabs: [
                { title: '歌单列表' },
                { title: '歌单简介' }
            ]
        }
    }

    getSingerInfo = (id) => {
        http.get('/playlist/detail', {
            params: {
                id

            }
        })
            .then(response => {
                this.setState({
                    playlist: response.data.playlist,

                })

            })

    }


    // 将参数放在地址栏上 带到下一个页面
    goToPlay = (id, name) => {

        this.props.history.push('/play/' + id + '?name=' + name)

    }





    render() {
        const { playlist, tabs } = this.state

        console.log(playlist)

        return (
            <div>
                <Header title='歌单' showBack={true} />
                <div className="singer-list">
                    <h3>
                        <img src={playlist.coverImgUrl} />
                    </h3>

                    <div className="singer-class" >
                        <h5>{playlist.name}</h5>
                        <span>{playlist.trackCount}首歌曲</span>
                    </div>

                </div>


                <div className="singer-hot" >


                    <Tabs
                        tabs={tabs}
                    >

                        <div className="singer-list-demo">
                            {playlist.tracks && playlist.tracks.map((item, index) => (
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

                        <div className='singer-desc'>{playlist.description}</div>

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