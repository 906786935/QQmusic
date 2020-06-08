//渲染功能：渲染图片、渲染背景颜色、音乐信息、是否喜欢
// var bg = document.getElementsByClassName('min-max')[0];
// bg.style.backgroundColor=`10,20,20,0.8`;

(function (root) {
    //渲染图片  W
    function renderImg(src){
        root.blurImg(src,document.getElementsByClassName('min')[0])//min添加图片
        let img = document.querySelector('.Img img')
        img.src = src
    }
    //渲染背景颜色
    function renderBack(back){
        var bg = document.getElementsByClassName('min-max')[0];
        bg.setAttribute('style',`background-color:rgba(${back},0.8)`);
    }
    //渲染音乐信息
    function renderInfo(music){
        $('.name').text(music.song)
        $('.singer').text(music.singer)
        $('.album').text(music.album)
    }
    //渲染是否喜欢
    function renderIsLike(lisk){
        if(lisk){
            $('.love').html('&#xe602;').css("color",'rgba(223,16,16,0.8)')
        }else{
            $('.love').html('&#xe61d;').css("color",'rgba(255,255,255,0.8)')

        }
    }


    root.reander = function(data){
        renderImg(data.image)
        renderBack(data.background)
        renderInfo(data)
        renderIsLike(data.isLike)
    }
})(window.player || (window.player = {}))