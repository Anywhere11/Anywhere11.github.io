//组件实例化

//引用REACT-DOM方法

import ReactDom, { render } from 'react-dom'
import React, {Component} from 'react'


//引入主视图文件
import { MainView } from './views'


// 引用Redux创建的store和React-Redux传参方法

// import { Provider } from 'react-redux'
// import store from './store'


// 实例化
const rootEle = document.getElementById('root')

const hotRender = () => {

    render(
        // 直接写在括号里面可以省略RETURN
        // <Provider store={store}>
            <MainView />,
        // </Provider>,
        rootEle
    )
}

// 必须执行上述方法才能实例化
hotRender()