$(function(){
    if(window.location.pathname == "/courses/2023"){
        const clsbtn = '<button id="download-slide-all" class="btn btn-success">すべてのスライドをDL</button>'
        $($(".flex")[0]).before(clsbtn);
    }
});

$(document).on("click", "#download-slide-all", function(){
    let confirm_regist = confirm("すべてのスライドDLをしますか？");
    if(confirm_regist){
        // href="/courses/2023/"からはじまるすべてのaタグを取得
        let a_tags = $("a[href^='/courses/2023/']");
        let a_tags_length = a_tags.length;
        let a_tags_href = [];
        for(let i = 0; i < a_tags_length; i++){
            a_tags_href.push(a_tags[i].href);
        }
        console.log(a_tags_href);

        // a_tags_hrefのすべてのurlにアクセスし、helloをalertする
        for(let i = 0; i < a_tags_length; i++){
            $.ajax({
                url: a_tags_href[i],
                type: "GET",
                success: function(data){
                    alert("hello");
                }
            });
        };

        // let registclasses = $(".well");
        // let textsh4 = $(registclasses).find(".media-heading");
        // let l_txt = [];
        // $(textsh4).each(function(index){
        //     l_txt.push($(this).text());
        // });

        // let registclass_local = JSON.stringify(l_txt, null, "");
        // localStorage.setItem("registedclass", registclass_local);
    }
});