
const request = require('request')

const RANGE_STRING = 'abcdefghijklmnopqrstuvwxyz'
const RANGE_NUM = '0123456789'

class CheckUser {
    constructor(len, callback, hasNum) {
        this.wantUserNameLength = len;
        this.rangeString = hasNum ? RANGE_STRING.concat(RANGE_NUM) : RANGE_STRING
        this.callback = callback
    }

    run() {
        let username = this._random()
        this._request(username)
    }

    _random(username = '') {
        if (username.length == this.wantUserNameLength) {
            return username
        } else {
            return this._random(username + this.rangeString.charAt(Math.floor(Math.random() * this.rangeString.length)))
        }
    }

    _request(username) {
        request(`https://github.com/${username}`, (err, res) => {
            if (!err && res.statusCode == 404) {
                if (this.callback) {
                    this.callback({
                        username,
                        unregistered: true,
                        message: '未注册'
                    })
                }
            } else {
                if (this.callback) {
                    this.callback({
                        username,
                        unregistered: false,
                        message: '已注册'
                    })
                }
            }
            this.run()
        })
    }
}

module.exports = CheckUser