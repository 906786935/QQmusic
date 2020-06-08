(function (root) {
    function listControl(data, wrap) {
        let musicArr = [];//储存所有的歌曲对应的dom
        let close = document.getElementsByClassName('close')[0]

        data.forEach((item, index) => {
            let ul = document.getElementsByClassName('list')[0]
            let li = document.createElement('li')
            li.innerHTML = `
                <div class="listName">${item.song}</div>
                <i class="iconfont">&#xe680;</i>
                <div class="listSinger">- ${item.singer}</div>
            `
            li.addEventListener('touchend', function () {
                changSelect(index)
            })
            musicArr.push(li)
            wrap.appendChild(li)
        });

        let disY = document.getElementsByClassName('musicList')[0]
        function slideUp() {
            $('.musicList').css({ transform: `translateY(0px)`})
        }
        //列表滑动隐藏
        function slideDown() {
            $('.musicList').css({ transform: `translateY(${disY.offsetHeight}px)`})
        }
        //关闭列表
        close.addEventListener('touchend', function () {
            slideDown()
        })
        changSelect(0)//

        //切换选中元素
        function changSelect(index) {
            for (let i = 0; i < musicArr.length; i++) {
                musicArr[i].className = ''
            }
            musicArr[index].className = 'effects'
        }

        return {
            musicArr,
            slideUp,
            slideDown,
            changSelect
        }
    }
    root.listControl = listControl
})(window.player || (window.player))