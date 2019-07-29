// 引入样式
import './index.scss'

import React, { Component } from 'react'

import { Header } from '~/components/header'

import { SearchBar } from 'antd-mobile'

import { http } from '&'


export class Search extends Component {
    constructor() {
        super()
        this.state = {
            searchList: []
        }
    }

    searchValue = (val) => {
        http.get('/search', {
            params: {
                keywords: val
            }
        })
            .then(response => {
                this.setState({
                    searchList: response.data.result.songs
                })

                // 清除输入框
                this.ipt.doClear()
            })
    }


    goToPlay = (id, name) => {
        this.props.history.push('/play/' + id + '?name' + name)

    }
    render() {
        const { searchList } = this.state
        console.log(searchList)
        return (
            <div className='main-search'>

                <Header
                    title='搜索'
                    showBack={true}
                />

                <SearchBar
                    placeholder='点击搜索'
                    ref={el => this.ipt = el}
                    onSubmit={this.searchValue}

                />


                <ul className='search-list'>
                    {
                        searchList && searchList.map((item, index) => {
                            return (
                                <li key={index} className='zoom-in' onClick={() => this.goToPlay(item.id)}>

                                    <h6>
                                        <span>{index + 1}</span>

                                    </h6>

                                    <div>
                                        <h3>
                                            <i className='iconfont icon-z1 '></i>
                                            <span>{item.name}</span>
                                        </h3>
                                        <h4>
                                            <i className='iconfont  icon-ren'></i>
                                            <span>{item.album.name}</span>
                                        </h4>
                                        <h5>
                                            <i className='iconfont icon-24gl-musicAlbum '></i>
                                            {
                                                item.artists.map((item, index) => {
                                                    return (
                                                        <span key={index}>{item.name}></span>
                                                    )
                                                })
                                            }
                                        </h5>
                                    </div>

                                    <p>
                                        <i className='iconfont icon-bofangsanjiaoxing'></i>
                                        <span>{Math.floor((item.duration / 1000) / 60) + '分' + Math.round(
                                            (item.duration / 1000) % 60) + '秒'
                                        }</span>
                                    </p>


                                </li>
                            )
                        })
                    }

                </ul>


            </div>
        )
    }
}