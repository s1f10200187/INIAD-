$(function(){
    if(window.location.pathname == "/courses"){
        const clsbtn = '<button id="class-sort-regist" class="btn btn-success">すべてのスライドをDL</button>'
        $($(".flex")[0]).before(clsbtn);
    }
});