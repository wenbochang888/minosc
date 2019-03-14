


var utils = require('../../utils/util.js');

const pageSize = 20;
var page = 1;

// pages/newtweet/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tweets: [],
    test: "test"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 1;
    var that = this
    wx.request({
      url: 'https://gdufe888.top/api/tweet/hotest',
      data: {
        page: page,
        pageSize: pageSize
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        page++;
        that.setData({
          tweets: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
    wx.reLaunch({
      url: 'list',
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // var that = this;
    // console.log("page = " + page);
    // wx.request({
    //   url: 'http://120.78.159.149:8083/api/tweet/hotest',
    //   data: {
    //     page: page,
    //     pageSize: pageSize
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (resdata) {
    //     page++;
    //     //排除重复id
    //     var oldMaxIndex = that.data.tweets.length > 0 ? that.data.tweets.length - 1 : 0;

    //     //看上一个列表的最后一个元素在下一个列表的第几个位置出来，然后排除0～i的元素
    //     for (let i = 0; i < resdata.length; i++) {
    //       if (resdata[i].id == that.data.tweets[oldMaxIndex].id) {
    //         resdata.splice(0, i + 1);
    //         break;
    //       }
    //     }
    //     // console.log(resdata);
    //     // resdata = utils.blockFilter(resdata);
    //     console.log(that);
    //     console.log(resdata);
    //     that.setData({
    //       tweets: that.data.tweets.concat(resdata.data.data)
    //     });
    //   }
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  previewImg: function (e) {
    var current = e.target.dataset;
    var urls = (typeof current.srcs != 'undefined') ? current.srcs.split(' ') : [current.src];
    console.log("current = " + current.src);
    console.log("urls = " + urls);
    wx.previewImage({
      current: current.src,
      urls: urls
      //urls: [current.src]
    })
  }

  // previewImg: utils.previewImg,

})