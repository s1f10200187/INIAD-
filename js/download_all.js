$(function(){
    if(window.location.pathname == "/courses"){
        const clsbtn = '<button id="download-all-slide" class="btn btn-success">すべてのスライドをDL</button>'
        $($(".flex")[0]).before(clsbtn);
    }
});