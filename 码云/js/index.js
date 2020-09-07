$(function(){
    $(".nav-branch:nth-of-type(5)").mouseenter(function () { 
        $(".repository").stop().slideDown();
    }).mouseleave(function(){
        $(".repository").stop().slideUp();
    });
    $(".nav-right input").focus(function (e) { 
        e.preventDefault();
        $(this).animate({width:"240px"},200)
    }).blur(function(){
        $(this).animate({
            width: "200px"
        }, 200)
    });

    $(window).scroll(function () { 
        let top=$(this).scrollTop();
        if(top>100){
            $(".scroll-top").fadeIn()
        }else{
            $(".scroll-top").fadeOut();
        }
    });
    $(".scroll-top").click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 500)
    })
})