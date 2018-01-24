// pages/in_theater/index.js
var url = "in_theaters";
var utils = require('../../utils/util.js');
// console.log(url)
Page({
    /**
     * 页面的初始数据
     */
    data: {
        films: [],
        currentPage: 0,
        isShow: true,
        over: false
    },
    showDetail: function (data) {
        this.setData({
            isShow: true
        })
        var id = data.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../../pages/detail/index?id=' + id,
        })
    },
    rander: function (res) {
        // console.log(res);
        this.setData({
            isShow: false,
            over: res.data.total == this.data.films.length ? true : false,
            films: this.data.films.concat(
                res.data.subjects.map(function (v) {
                    var obj = {
                        id: v.id,
                        genres: v.genres.toString().replace(/,/g, "、"),
                        directors: v.directors.map(function (v) {
                            return v.name
                        }).toString().replace(/,/g, "、"),
                        casts: v.casts.map(function (v) {
                            return v.name
                        }).toString().replace(/,/g, "、"),
                        images: v.images.medium,
                        year: v.year,
                        title: v.title,
                        original_title: v.original_title,
                        average: v.rating.average
                    };
                    return obj
                })
            )
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        utils.getFilms(
            url,
            {},
            this.rander
        );
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

        console.log('ready')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (this.data.films.length) this.setData({ isShow: false })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log('hide')
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.over) return false;
        this.setData({
            isShow: true
        })
        utils.getFilms(
            url,
            {
                page: ++this.data.currentPage
            },
            this.rander
        );
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})