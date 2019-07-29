// 引入样式
import './index.scss'


import React, { Component } from 'react'
import { Header } from '~/components/header'

import { http ,history} from '&'

export class Video extends Component {
    constructor() {
        super()
        this.state = {
            video:'',

        }
    }

    getVideo = (id) => {
        http.get('/mv/url', {
            params: {
                id
            }
        })
        .then(response=>{
           
            this.setState({
                video:response.data.data.url
            })
        })
    }


    closePage = () =>{
        history.go(-1)
    }

    render() {
        const {video} = this.state
        console.log(video)
        return (
            <div className='main-video'>
                <video
                src={video}
                controls
                autoPlay
                
                ></video>

                <i className='iconfont icon-chenghao' onClick={this.closePage}></i>
            </div>
        )
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.getVideo(id)


    }
}
