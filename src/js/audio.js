(function (root) {
    function AudioManage(){
        this.audio = new Audio();//创建一个audio实例
        document.body.appendChild(this.audio)
        this.status = 'pause';//音频的状态
    }
    AudioManage.prototype = {
        //加载音乐
        load(src){
            this.audio.src = src;//设置音频的路径
            this.audio.load();//加载音乐
        },
        //播放音乐
        play(){
            root.pro.start()
            this.status='play'
            this.audio.play()
        },
        //暂停音乐
        pause(){
            this.status = 'pause';
            this.audio.pause()
        },
        //音乐播放完成后
        end(fn){
            this.audio.onended = fn
        },
        //跳到音乐的某个时间点
        playto(time){
            this.audio.currentTime = time;//单位秒
        }
    }
    root.music = new AudioManage();

})(window.player || (window.player = {}))