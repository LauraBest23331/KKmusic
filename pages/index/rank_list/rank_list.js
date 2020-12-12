// pages/index/rank_list/rank_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songs: [],
    playUrl: "/assets/images/stop.png",
    stopUrl: "/assets/images/play.png",
    bindUrl: [],
    isPause: true
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://musicapi.leanapp.cn/search?keywords=最热歌曲', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        // console.log(res.data.result.songs)
        let temp_songs = res.data.result.songs
        let _songs = []
        let j = 0;
        for (let i = 0; i < temp_songs.length; i++) {
          if (temp_songs[i].fee != 1) {
            _songs[j] = temp_songs[i]
            j++
          }

        }
        console.log(_songs)
        that.setData({
          songs : _songs
        })
        let temp_bind = []
        for (const key in that.data.songs) {
          temp_bind[key] = true
        }
        that.setData({
          bindUrl : temp_bind
        })
        // console.log(that.data.bindUrl)
        console.log(that.data.songs)
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
  play: function name(event) {
    const now_id = event.target.dataset.cid
    let temp = this.data.bindUrl

    for (const key in temp) {
      if (key == now_id) {
        temp[key] = !temp[key]
      }
      else {
        temp[key] = true
      }
    }
    this.setData({
      bindUrl:temp
    })
    if (!temp[now_id]) {
      
      wx.playBackgroundAudio({
        dataUrl: 'https://music.163.com/song/media/outer/url?id='+ this.data.songs[now_id].id +'.mp3'
      })
    }
    else {
      wx.pauseBackgroundAudio()
    }
    // console.log(this.data.bindUrl)
  }
})