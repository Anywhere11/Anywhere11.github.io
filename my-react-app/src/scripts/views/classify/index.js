// 引入样式
import './index.scss'

import React, { Component } from 'react'
import { Header } from '~/components/header'

import { Tabs } from 'antd-mobile';

import { http } from '&'


export class Classify extends Component {
    constructor() {
        super()
        this.state = {
            artistCategory: [
                { title: '华语男歌手', code: '1001' },
                { title: '华语女歌手', code: '1002' },
                { title: '华语组合', code: '1003' },
                { title: '韩国男歌手', code: '7001' },
                { title: '韩国女歌手', code: '7002' },
                { title: '韩国组合', code: '7003' },
                { title: '欧美男歌手', code: '2001' },
                { title: '欧美女歌手', code: '2002' },
                { title: '欧美组合', code: '2003' },
                { title: '日本男歌手', code: '6001' },
                { title: '日本女歌手', code: '6002' },
                { title: '日本组合', code: '6003' },

            ],
            artistCategoryList: [],
        }
    }




    getArtistCategoryList = (code) => {
        this.setState({
            artistCategoryList: []
        })

        http.get('/artist/list', {
            params: {
                limit: 50,
                cat: code
            }
        })
            .then(response => {

                this.setState({
                    artistCategoryList: response.data.artists
                })
            })
    }

    changeTab = (tab) => {

        this.getArtistCategoryList(tab.code)
    }

    goToDetail = (id) => {

        this.props.history.push('/singer/'+id)

    }

    render() {
        const { artistCategoryList } = this.state

        return (
            <div>
                <Header title='分类' showBack={true} />
                <div className="music-classification">
                    <Tabs tabs={this.state.artistCategory}
                        initialPage={0}
                        onChange={(tab) => this.changeTab(tab)}
                    ></Tabs>
                </div>


                <div className="music-singer">
                    <div className="music-singer-list">
                        {artistCategoryList.map((item, index) => (
                            <div className="music-singer-img zoom-in" key={index} onClick={() => this.goToDetail(item.id)} >
                                <h4>
                                    <img
                                        src={item.picUrl}
                                    />
                                </h4>
                                <div className="music-singer-detial">
                                    <div className="music-singer-left">
                                        <h3>{item.name}</h3>
                                        <span>{item.albumSize}张专辑 | {item.musicSize}首单曲</span>
                                    </div>
                                    <i className="iconfont icon-552cc1babd9aa"></i>
                                </div>
                            </div>

                        ))}
                    </div>


                </div>

            </div>
        )
    }

    componentDidMount() {

        const { artistCategoryList, artistCategory } = this.state

        if (artistCategoryList.length < 1) {

            this.getArtistCategoryList(artistCategory[0].code)
        }


    }

}