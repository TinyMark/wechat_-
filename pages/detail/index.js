// pages/in_theater/index.js
var utils = require('../../utils/util.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isShow: true,
        data: {}
    },
    rander: function (res) {
        console.log(res);
        var res = res.data
        this.setData({
            isShow: false,
            data: {
                aka: res.aka.toString().replace(/,/g, '、'),
                directors: res.directors.map(function (v) {
                    return v.name
                }).toString().replace(/,/g, "、"),
                casts: res.casts.map(function (v) {
                    return v.name
                }).toString().replace(/,/g, "、"),
                countries: res.countries.toString().replace(/,/g, '、'),
                genres: res.genres.toString().replace(/,/g, '、'),
                images: res.images.medium,
                original_title: res.original_title,
                rating: res.rating.average,
                summary: res.summary,
                title: res.title,
                year: res.year,
                reviews_count: res.reviews_count,
                ratings_count: res.ratings_count
            }
        })
        wx.setNavigationBarTitle({
            title: res.title
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var id = getCurrentPages()[getCurrentPages().length - 1].options.id;
        utils.getDetail(id, this.rander);
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

        console.log('show')
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
        // if (this.data.over) {
        //     return false
        // }
        // utils.getFilms(
        //     url,
        //     {
        //         page: ++this.data.currentPage
        //     },
        //     this.rander
        // );
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})