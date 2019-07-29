// 先引入样式
import "./index.scss"

// 引入UI库
import {TabBar} from 'antd-mobile';

import React, { Component } from 'react'

// 引入安装第三方history插件封装的方法
import{history} from '&'

import {observer} from 'mobx-react'
import Data from '~/mobx/data.js'

@observer
 class Foot extends Component{
    constructor(){
        super()
        this.state = {
            // 用于生成Footer的数据
            footList:[
                {txt:'首页',path:'/app/home',name:'home',icon:'icon-heijiaochangpianji'},
                { txt: '分类', path: '/app/classify', name: 'classify', icon: 'icon-z1' },
                { txt: '视频', path: '/app/mv', name: 'mv', icon: 'icon-shipin' },
                { txt: '我', path: '/app/mine', name: 'mine', icon: 'icon-gerenzhongxin' },
            ],
            // 用于确定显示的页面
            // selectedTab:'home
        }
    }
    render() {
        const {navTab,changeTab} = Data
        return (
            <div style={{ position: 'fixed', width: '100%', height: '.9rem', left: 0, bottom: 0 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    {
                        this.state.footList.map((item, index) => {
                            return (
                                <TabBar.Item
                                    title={item.txt}
                                    key={index}
                                    //字体图标两个class之间有个空格
                                    icon={<i className={'iconfont ' + item.icon} style={{ width: 22, height: 22, display: 'block' }}></i>}
                                    selectedIcon={<i className={'iconfont ' + item.icon} style={{ width: 22, height: 22, display: 'block' }}></i>}
                                    selected={navTab == item.name}
                                    //让第三个图标展示数量
                                    badge={index == 2 ? 99 : 0}
                                    //点击跳转到特定页面
                                    onPress={() => {
                                        //⚠️由于Foot不是路由  所以没有history方法 
                                        //最好借用第三方插件完成
                                        history.push(item.path)
                                        // this.props.dispatch(changeTab(item.name))
                                        changeTab(item.name)
                                    }}
                                    data-seed="logId"
                                >
                                </TabBar.Item>
                            )
                        })
                    }
                </TabBar>
            </div>

        )
    }

    componentDidMount(){

            /* eslint-disable */
            const page = location.hash.split('#/app/')[1]
            /* eslint-enable */

        Data.changeTab(page)
        localStorage.newTab = page
    }
}

export default Foot