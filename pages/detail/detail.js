// pages/detail/detail.js
var util = require('../../utils/util.js');
var modalImg = require('../template/modal-img.js');
const commentPerPage = 20;
var currentPage = 1;
var app = getApp();
var finishLoadComments = false;

Page({

  // rawComments:[], //原始评论数据，不包含block

  /**
   * 页面的初始数据
   */
  data: {
    tweet: {},
    replies: [],
    replyPage: 0,
    tweetId: '',
    commentCount: 0,
    tweetBodyHtml: '',
    comments: [],
    finishLoadComments: false,
    commentPerPage: currentPage,
    tweetData: '',
    bookmarked: false,
    finishLoadList: true //第一页评论不加载loading icon
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.tweetId = options.id;
    that.commentCount = options.cnt;

    //显示评论
    currentPage = 1;
    wx.request({
      url: 'https://gdufe888.top/api/comment/list',
      data: {
        page: currentPage,
        pageSize: commentPerPage,
        id: that.tweetId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (resdata) {
        finishLoadComments = resdata.data.length < commentPerPage ? true : false;
        console.log("len1 = " + resdata.data.length);
        currentPage++;
        that.setData({
          comments: resdata.data,
          finishLoadComments: finishLoadComments,
          commentCount: that.commentCount
        })
      }
    });
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

    // wx.showToast({
    //   title: '暂时禁止下拉刷新',
    //   icon: "success"

    // })
    // return;//暂时禁止

    // var that = this;


    // wx.reLaunch({
    //   url: 'detail?id='+that.tweetId,
    // });

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    //console.log(that.data.finishLoadComments);return;
    if (finishLoadComments) {
      that.setData({ finishLoadComments: true })
      return;
    }
    wx.request({
      url: 'https://gdufe888.top/api/comment/list',
      data: {
        page: currentPage,
        pageSize: commentPerPage,
        id: that.tweetId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (resdata) {
        finishLoadComments = resdata.data.length < commentPerPage ? true : false;
        console.log("len2 = " + resdata.data.length);
        console.log(finishLoadComments);
        var commentData = that.data.comments.concat(resdata.data);
        currentPage++;
        that.setData({
          finishLoadComments: finishLoadComments,
          comments: commentData
        })
      }
    });

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  modalSubmit: modalImg.modalSubmit,
  preventTouchMove: modalImg.preventTouchMove,
  closeImgModal: modalImg.closeImgModal,
  bigImgLoaded: modalImg.bigImgLoaded,
  previewImg: modalImg.previewImg

})