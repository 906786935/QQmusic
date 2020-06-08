(function ($, root) {
    let dur,
        startTime = 0,
        listPer = 0,
        frameId,
        flag = false
    //渲染总时长
    function renderAllTime(time) {
        dur = time
        time = formatTime(time)
        $('.totalTime').text(time)
    }
    //将总时长转换为分钟
    function formatTime(time) {
        let m = Math.floor(time / 60)
        let s = Math.floor(time % 60);
        m = m < 10 ? '0' + m : m
        s = s < 10 ? '0' + s : s
        return m + ":" + s
    }
    //开始进度条功能
    function start(p) {
        player.music.start = 'play'
        listPer = p === undefined ? listPer : p;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime()
        function frame() {
            let curTime = new Date().getTime()
            let per = listPer + (curTime - startTime) / (dur * 1000)
            if (per <= 1) {
                upDate(per);
            } else {
                flag = true;
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }
    //更新进度条
    function upDate(per) {
        //更新事件
        let time = formatTime(per * dur)
        $('.curTime').html(time)
        //更新进度条
        let pagX = per * $('.backBg')[0].clientWidth
        $('.frontBg').css('width', pagX + 'px')
    }
    //判断是否播放完成
    function xia(){
        if(!flag){
            return false
        }
        flag = false
        return true
    }
    //删除进度缓存
    function stop(er) {
        cancelAnimationFrame(frameId)
        let stopTime = new Date().getTime()
        listPer = listPer + (stopTime - startTime) / (dur * 1000)
    }
    root.pro = {
        renderAllTime,
        start,
        upDate,
        stop,
        xia,
    }
})(window.Zepto, window.player || (window.player = {}));