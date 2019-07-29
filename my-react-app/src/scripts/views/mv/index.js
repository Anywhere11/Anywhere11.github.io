// 引入样式
import './index.scss'

import React, { Component } from 'react'
import {Header} from '~/components/header'

import {http} from '&'

export class Mv extends Component {

    constructor(){
        super()
        this.state =  {
            musicMv:[],

        }
    }



    getMusicMv = () =>{
        http.get('/top/mv',{
           params:{
               limit:10
           } 
        })
        .then(response =>{
            this.setState({
                musicMv:response.data.data
                
            })
        })
    }

    goToVideo = (id) =>{
        this.props.history.push('/video/' + id)
    }

    render() {
        const {musicMv} = this.state
        console.log(musicMv)

        return (
            <div>
                  <Header title='视频' showBack={true}/>

                  <div className="mv-music">
                    {
                        musicMv.map((item,index) =>{
                            return (
                                <div className='mv-list-item' key={index}>
                                     <img onClick={() => this.goToVideo(item.id)} src={item.cover} alt=""/>
                                    <h4>{item.artistName} | {item.name}</h4>
                                   
                                </div>
                            )
                        })
                    }
                   

                  </div>

            </div>
        )
    }

    componentDidMount(){
        this.getMusicMv()
    }
}