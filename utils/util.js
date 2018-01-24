const api = require('./api.js');

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
const getDetail = (id, callback) => {
    wx.request({
        url: api.detail + id,
        header: {
            "Content-Type": "application/json; charset=utf-8"
        },
        success: function (res) {
            callback(res);
        }
    })
}
const getFilms = (url, ops, callback) => {
    var options = {
        city: ops.city || '广州',
        count: ops.count || 5,
        start: (ops.page || 0) * (ops.count || 5)
    }
    wx.request({
        url: api[url],
        data: {
            city: options.city,
            count: options.count,
            start: options.start
        },
        header: {
            "Content-Type": "application/json; charset=utf-8"
        },
        success: function (res) {
            console.log(res)
            callback(res);
        }
    })
}

module.exports = {
    getFilms: getFilms,
    formatTime: formatTime,
    getDetail: getDetail
}
