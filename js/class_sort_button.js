$(function(){
    if(window.location.pathname == "/courses"){
        const clsbtn = '<button id="download-slide-all" class="btn btn-success">すべてのスライドをDL</button>'
        $($(".flex")[0]).before(clsbtn);
    }
});

$(document).on("click", "#download-slide-all", function(){
    let confirm_regist = confirm("すべてのスライドDLをしますか？");
    if(confirm_regist){
        let registclasses = $(".well");
        let textsh4 = $(registclasses).find(".media-heading");
        let l_txt = [];
        $(textsh4).each(function(index){
            l_txt.push($(this).text());
        });

        let registclass_local = JSON.stringify(l_txt, null, "");
        localStorage.setItem("registedclass", registclass_local);
    }
});