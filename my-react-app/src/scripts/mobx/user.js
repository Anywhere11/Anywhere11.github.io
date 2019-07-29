import {observable,action} from 'mobx'

class User{
    @observable userInfo = {
       isLogin:false,
       mobile:'',
       avatar:'',
       token:''
    }

    @action updateUserInfo = (info) =>{
        this.userInfo = info
    }
    @action updateUserAvatar = (url) =>{
        this.userInfo.avatar = url
    }
}

export default new User()