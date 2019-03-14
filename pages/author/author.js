// pages/author/author.js

const pageSize = 20;
var page = 1;
var authorId;
var finishLoadComments = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tweets: [],
    authorName: "",
    authorImg: "",
    finishLoadComments: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    page = 1;
    var that = this
    that.authorId = options.id;
    wx.request({
      url: 'https://gdufe888.top/api/tweet/' + that.authorId,
      data: {
        page: page,
        pageSize: pageSize
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        finishLoadComments = res.data.data.length < pageSize ? true : false;
        console.log("len1 = " + res.data.data.length);
        var len = res.data.data.length == 0 ? false : true;
        console.log("len = " + len);
        page++;
        that.setData({
          tweets: res.data.data,
          finishLoadComments: finishLoadComments,
          authorName: res.data.data[0].author,
          authorImg: res.data.data[0].portrait
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    if (finishLoadComments) {
      that.setData({
        finishLoadComments: true
      })
      return;
    }
    // console.log("page = " + page);
    wx.request({
      url: 'https://gdufe888.top/api/tweet/' + that.authorId,
      data: {
        page: page,
        pageSize: pageSize
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(resdata) {
        finishLoadComments = resdata.data.data.length < pageSize ? true : false;
        console.log("len2 = " + resdata.data.data.length);
        page++;
        //排除重复id
        var oldMaxIndex = that.data.tweets.length > 0 ? that.data.tweets.length - 1 : 0;

        //看上一个列表的最后一个元素在下一个列表的第几个位置出来，然后排除0～i的元素
        for (let i = 0; i < resdata.length; i++) {
          if (resdata[i].id == that.data.tweets[oldMaxIndex].id) {
            resdata.splice(0, i + 1);
            break;
          }
        }
        that.setData({
          tweets: that.data.tweets.concat(resdata.data.data),
          finishLoadComments: finishLoadComments
        });
        // console.log(tweets);
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  previewImg: function(e) {
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
})