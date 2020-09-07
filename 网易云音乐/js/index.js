$(function () {
    let url = "http://localhost:3000/search?keywords=成都"
    $.ajax({
        url,
        type: "get",
        dataType: "json",
        success: (res) => {
            let data = res.result.songs;
            let str = "";
            let len = data.length;
            let arr = url.split("=")

            var s = arr[1];
            var reg = new RegExp("(" + s + ")", "g");

            for (let i = 0; i < data.length; i++) {
                let time = parseInt(data[i].duration / 1000);
                let mintues = parseInt(time / 60);
                let seconds = parseInt(time % 60);
                if (mintues < 10) {
                    mintues = "0" + mintues;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                let namestr = data[i].name
                let albumstr = data[i].album.name
                let name = namestr.replace(reg, "<font color=#0c73c2>$1</font>");
                let album = albumstr.replace(reg, "<font color=#0c73c2>$1</font>");

                str += `<div class="single-song">
                <div class="ss-left">
                    <i class="iconfont icon-arrow-"></i>
                    <span class="song-name">${name}</span>
                </div>
                <div class="save-icon">
                    <i class="iconfont icon-jia"></i>
                    <i class="iconfont icon-shoucangjia1"></i>
                    <i class="iconfont icon-fenxiang"></i>
                    <i class="iconfont icon-xiazai"></i>
                </div>
                <span class="song-author">${data[i].artists[0].name}</span>
                <span class="collection">《<em class="collect-name">${album}</em>》</span>
                <span class="time">${mintues}:${seconds}</span>
                </div>`
            }
            $(".songs").html(str)
            $(".snote").find("em").append(len)
        },
        error: (err) => {
            console.log(err);
        }

    })

    $(".song-list").click(function () {
        $(this).addClass("active").siblings().removeClass("active")
    })
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 50) {
            $(".to-top").css("display", "block")
        } else {
            $(".to-top").css("display", "none")
        }
    })
    $(".to-top").click(function () {
        $("html,body").animate({ scrollTop: $(".top").offset().top }, 800);
    })
    
})