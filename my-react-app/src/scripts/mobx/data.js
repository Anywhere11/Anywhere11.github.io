import {observable,action} from 'mobx'
class Data{
    @observable navTab = 'home'

    @action changeTab = (tab) =>{
        this.navTab = tab
    }
}

export default new Data()