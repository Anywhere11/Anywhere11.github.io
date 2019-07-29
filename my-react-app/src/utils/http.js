import { Toast } from 'antd-mobile'

const querystring = require('querystring')

// const $commonUrl = 'http://localhost:8881'

const $commonUrl = 'http://123.57.211.31:8880'

export const http = {

    // ⚠️这里先对params进行了一次解构
    get: function (url, { params }) {

        return new Promise((resolve, reject) => {

            params = querystring.stringify(params)

            const handle = function () {

                if (this.readyState !== 4) {
                    return
                }

                if (this.status === 200) {
                    resolve({ data: this.response })
                } else {
                    reject(new Error(this.statusTxt))
                }
            }

            const xhr = new XMLHttpRequest()
            xhr.open('get', $commonUrl + url + '?' + params, true)
            xhr.onreadystatechange = handle
            xhr.responseType = 'json'
            xhr.setRequestHeader('Accept', 'application/json')
            xhr.send()
        });
    }
}