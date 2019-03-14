
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

module.exports = {
  formatTime: formatTime,
  blockFilter: blockFilter,
  clickLink: clickLink
}

function blockFilter(resdata) {
  // console.log("到这里啦");
  var blocklist = wx.getStorageSync('blocklist') || [];
  if (blocklist.length > 0) {

    for (var i = 0; i < resdata.length; i++) {

      var authorid = resdata[i].authorid;
      for (var j = 0; j < blocklist.length; j++) {
        if (authorid == blocklist[j].authorid) {
          resdata.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }
  return resdata;

}

function clickLink(event) {

  // console.log('click link');
  // console.log(event);
}


