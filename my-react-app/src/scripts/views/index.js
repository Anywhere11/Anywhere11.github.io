// 主视图文件

import React, {Component} from 'react'
import {axios} from '&'

import {Toast} from 'antd-mobile'

import User from '~/mobx/user.js'


// 引入路由
import {HashRouter,BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'

// 引入 组件
import {Guide} from './guide'
import {App} from './app'
import {Login} from './login'
import {Scan} from './scan'
import {Search} from './search'
import {Singer} from './singer'
import {Play} from './play'
import {Comment} from './comment'
import {Video} from './video'
import {Playlist} from "./playlist"






export class MainView  extends  Component{

   
    render(){
        return(
            <HashRouter basename='/'>
                <Route component ={Layout}></Route>
            </HashRouter>
        )
    }
}

// 主视图路由的跳转配置
export class Layout extends Component{

    // componentWillUpdate(){
    //     // ⚠️当前页面跳转时 将之前的新的页面改为旧页面 将现在所处的页面设定为新页面
    //     const page = location.hash.split('#/app/')[1]
    //     localStorage.oldTab = localStorage.newTab
    //     localStorage.newTab = page
        
    // }
    render(){
        return(
            <div id = 'main' style={{padding:"0 0 .9rem 0"}}>
                {/* 精准匹配 + 重定向 */}
                <Switch>
                    {/* 精准匹配 + 重定向 */}
                    <Route path="/" exact render={()=>< Redirect to='/guide'/>} />
                    <Route path="/guide" component={Guide} />
                    <Route path="/app" component={App} />
                    <Route path="/scan" component={Scan} />
                    <Route path="/login" component={Login} />
                    <Route path="/search" component={Search} />
                    <Route path="/singer/:id" component={Singer} />
                    <Route path="/play/:id?" component={Play} />
                    <Route path="/comment/:id?" component={Comment} />
                    <Route path="/video/:id?" component={Video} />
                    <Route path="/playlist/:id?" component={Playlist} />




                    {/* 路由重定向 */}

                    <Route render={() => <Redirect to ='/app/home' />}/>

                </Switch>
            </div>
        )
    }

    componentDidMount(){
        axios.post('user/info',{})
        .then(response=>{
            const {code,msg,userInfo}  = response.data
            if(code == 1){
                const {updateUserInfo} = User

                if(userInfo.avatar) {
                    updateUserInfo({
                        isLogin:true,
                        mobile:userInfo.username,
                        avatar:userInfo.avatar,
                        token:localStorage.token
                    })

                }else{
                    const url = require('@/assets/img/avatar.jpg')

                    updateUserInfo({
                        isLogin:true,
                        mobile:userInfo.username,
                        avatar:url,
                        token:localStorage.token,

                    })

                }
               
            } else{
                Toast.fail(msg)
            }
        })
    }
    
}