(function ($, player) {
  function MusicPlayer(dom) {
    this.wrap = dom;//播放器的容器
    this.dataList = [];//储存请求到的数据
    this.curIndex = 0;
    this.rotateTimer = null;//选择计时器
    this.Ctime = 0;
  }
  MusicPlayer.prototype = {
    init() {//初始化
      this.getDom()//获取元素
      this.getData('/dist/mock/data.json')//请求数据
    },
    getDom() {//获取页面的元素
      this.record = document.querySelector('.Img img')//获取img图片
      this.F5 = document.querySelectorAll('.F5 div');//获取底部导航按钮
    },
    getData(url) {
      const This = this
      $.ajax({
        url: url,
        method: 'get',
        success: function (data) {
          This.dataList = data;//存储请求的数据
          This.listPlay();//列表切歌
          This.indexObj = new player.controlIndex(data.length);
          This.loadMusic(This.indexObj.index);//加载音乐
          This.musicContorl();//控制音乐
          This.bindTouch();//开启拖拽功能

        },
        error: function () {
          console.log('数据请求失败')
        }
      })
    },
    //加载音乐
    loadMusic(index) {
      player.reander(this.dataList[index]);//渲染图片、歌曲信息
      player.music.load(this.dataList[index].audio)//加载音乐
      if (player.music.status == 'play') {
        player.music.play();//
        this.F5[2].innerHTML = '&#xe60f;'//把按钮状态变成播放
        this.imgRotate(0);//切歌旋转图片
      }
      this.list.changSelect(index)
      this.curIndex = index;//存储当前歌曲对应的索引值
      //音频加载完成后获取总时长
      player.music.audio.oncanplay = function () {
        player.pro.renderAllTime(player.music.audio.duration)
      }

      this.proNext();//开启播放完自动下一首
    },
    //旋转img图片
    imgRotate(deg) {
      const This = this
      clearInterval(this.rotateTimer)
      this.rotateTimer = setInterval(function () {
        deg = +deg + 0.2;
        $('.Img img').css({ transform: `rotate(${deg}deg)` }).attr('rotate', deg)
      }, 1000 / 60)
    },
    //停止图片旋转
    imgStop() {
      clearInterval(this.rotateTimer)
    },
    //控制音乐
    musicContorl() {
      const This = this
      //上一首
      this.F5[1].addEventListener('touchend', function () {
        player.music.status = 'play'
        This.loadMusic(This.indexObj.prev())
        player.pro.start(0)

      })

      //播放、暂停
      this.F5[2].addEventListener('touchend', function () {
        if (player.music.status == 'play') {//如果为播放状态
          player.music.pause();//暂停
          player.pro.stop();//暂停进度条
          This.F5[2].innerHTML = '&#xe6bd;';//把按钮状态变成播放
          This.imgStop();//切歌旋转图片
        } else {
          player.music.play();//播放
          player.pro.start();//开启进度条
          This.F5[2].innerHTML = '&#xe60f;';//把按钮状态变成暂停
          let deg = $('.Img img').attr('rotate') || 0;//
          This.imgRotate(deg);//切歌旋转图片
        }
      })
      //下一首
      this.F5[3].addEventListener('touchend', function () {
        player.music.status = 'play'
        This.loadMusic(This.indexObj.next())
        player.pro.start(0)
      })
    },
    //播放完后自动下一首
    proNext() {
      setInterval(()=>{
        if (player.pro.xia()) {
          player.music.status = 'play'
          this.loadMusic(this.indexObj.next())
          player.pro.start(0)
        }
      },1000)
        
    },
    //列表切歌
    listPlay() {
      const This = this
      this.list = player.listControl(this.dataList, this.wrap)
      //弹出列表
      this.F5[4].addEventListener('touchend', function () {
        This.list.slideUp();//显示列表
      })
      //g歌曲列表添加事件
      this.list.musicArr.forEach(function (item, index) {
        item.addEventListener('touchend', function () {
          if (This.curIndex == index) {//如果点击是当前的歌曲，无论是否播放都无效
            return
          }
          player.music.status = 'play';//歌曲要变成播放状态
          player.pro.start(0)
          This.indexObj.index = index;//索引值对象身上的当前索引要更新
          This.loadMusic(index);//加载点击对应的索引值的那首歌曲
          This.list.slideDown();//列表消失
        })

      })
    },
    //拖拽进度条功能
    bindTouch() {
      let This = this
      let offset = $('.backBg').offset();
      let left = offset.left
      let width = offset.width
      $('.drag').on('touchstart', () => {
        player.pro.stop()
      }).on('touchmove', (e) => {
        let x = e.changedTouches[0].clientX;
        let per = Math.abs(x - left) / width
        if (per >= 0 && per <= 1) {
          player.pro.upDate(per)
        }
      }).on('touchend', (e) => {
        let x = e.changedTouches[0].clientX;
        let per = (x - left) / width
        player.pro.upDate(per)
        if (per > 0 && per <= 1) {
          // player.music.status = 'play'
          var cutTime = per * player.music.audio.duration
          player.music.playto(cutTime)
          player.pro.start(per)
          if (player.music.status === 'pause') {
            player.pro.stop();
          }
        }
      })
    }
  }
  let musicPlayer = new MusicPlayer(document.getElementsByClassName('list')[0])
  musicPlayer.init()
})(window.Zepto, window.player)

