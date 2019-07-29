//引入样式
import './index.scss'

import React, { Component } from 'react'


import { NavBar, Icon, Popover, ActionSheet } from 'antd-mobile'



import { history } from '&'

const Item = Popover.Item

export class Header extends Component {
    constructor() {
        super()
        this.state = {
            //是否显示搜索图标
            showSearch: true
        }
    }
    //后退事件
    goBack = (showBack) => {
        //如果有后退按钮点击才返回 （防止没有图标但是依然有事件）
        if(showBack){
            history.go(-1)
         
          

        }
     }

     //点击进入搜索事件
     goToSearch = ()=>{
         history.push('/search')
     }



    render() {
        const {showBack,title} = this.props
        const {showSearch} = this.state
        return (
            <div className='common-header'>
                <NavBar
                    mode="light"
                    //判断是否显示返回按钮
                    icon={showBack && <Icon type="left" color='#666'/>}
                    onLeftClick={() => this.goBack(showBack)}
                    rightContent={[
                        showSearch && <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.goToSearch} color='#666'/>,
                        <Pop key="1" />
                    ]}

                >{title}</NavBar>

            </div>
        )
    }

    componentDidMount() {
        //如果当前页面是搜索页面 不会显示搜索图标

        // const hash = location.hash
        // const page = hash.split('#/')[1]
       
        // if (page == 'search') {
        //     this.setState ({
        //         showSearch: false
        //     })
        // }
    }
}
const wrapProps = {
    onTouchStart: e => e.preventDefault()

}

//ActionSheet
const showActionSheet = () => {
    const BUTTONS = ['拍照', '从相册选择', '取消'];
    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        message: '请选择一张图片',
        maskClosable: true,
        'data-seed': 'logId',
        wrapProps,
    },
        (buttonIndex) => {
            console.log(buttonIndex)
        });
}

//Popover
class Pop extends Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            selected: ''
        }
    }

    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    }
    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value
        })
        //判断跳转路由
        const value = opt.props.value

        if (value == 'scan') {
            history.push('/scan')
        } else if (value == 'login') {
            history.push('/login')
        } else if (value == 'photo') {
            showActionSheet()
        }

    }
    render() {
        return (
            <div>
                <Popover mask
                    overlayClassName="fortest"
                    overlayStyle={{ color: 'currentColor' }}
                    visible={this.state.visible}
                    overlay={[
                        (<Item key="4" value="scan" icon={<i className="iconfont icon-saoma"></i>} data-seed="logId">扫一扫</Item>),
                        (<Item key="5" value="login" icon={<i className="iconfont icon-log-in"></i>} style={{ whiteSpace: 'nowrap' }}>登入</Item>),
                        (<Item key="6" value="photo" icon={<i className="iconfont icon-camera"></i>}>
                            <span style={{ marginRight: 5 }}>拍照</span>
                        </Item>),
                    ]}
                    align={{
                        overflow: { adjustY: 0, adjustX: 0 },
                        offset: [-10, 0],
                    }}
                    onVisibleChange={this.handleVisibleChange}
                    onSelect={this.onSelect}
                >
                    <div style={{
                        height: '100%',
                        padding: '0 15px',
                        marginRight: '-15px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    >
                        <Icon type="ellipsis" />
                    </div>
                </Popover>
            </div>
        )
    }
}


