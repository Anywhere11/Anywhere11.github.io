//引入样式
import './index.scss'

//引入路由组件
import {Switch,Route,Redirect} from 'react-router-dom'
import React, { Component } from 'react'
//引入页面路由
import {Home} from '../home'
import {Classify} from '../classify'
import  {Mv} from '../mv'
import  Mine from '../mine'

//引入公共脚部结构
import Foot from '~/components/foot'




export class App extends Component{
    render(){
        return(
            <div>
                {/* 控制APP页面的跳转 */}
                <Switch>
                    <Route path='/app/home' component={Home} />
                    <Route path='/app/classify' component={Classify} />
                    <Route path='/app/mv' component={Mv} />
                    <Route path='/app/mine' component={Mine} />
                    {/* 页面重定向 */}
                    < Route render={()=> <Redirect to='/app/home' />}/>
                </Switch>

                <Foot />

            </div>
        )
    }
}