$(function(){
    $(".nR-two li").click(function(){
        $(this).addClass("active-li").siblings().removeClass("active-li")
        let index=$(this).index();
        console.log(index);

        $(".cr-Cont").eq(index).show().siblings().hide();

    })
    $(".food-list-li").click(function(){
        $(this).addClass("active-food").siblings().removeClass("active-food")
    })
})