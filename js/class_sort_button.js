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


        // iframeを動的に生成し、src属性を変更する関数
        function openURLsInIframe(urls) {
          // iframeを生成
          const iframe = document.createElement('iframe');
          iframe.style.width = '100%';
          iframe.style.height = '500px'; // 適切なサイズに設定
          document.body.appendChild(iframe);

          // 各URLを順番に開く
          let currentIndex = 0;

          const loadNextURL = () => {
            if (currentIndex >= urls.length) {
              console.log('全てのURLが読み込まれました');
              return; // 全てのURLを処理したら終了
            }

            // 現在のURLをiframeのsrcに設定
            iframe.src = urls[currentIndex];
            console.log(`${urls[currentIndex]} を読み込み中...`);

            // 次のURLへ
            currentIndex++;

            // 次のURLを読み込む前に少し待つ（例: 5秒）
            setTimeout(loadNextURL, 5000);
          };

          // 最初のURLを読み込む
          loadNextURL();
        }

        // 関数を呼び出し、URLを開始
        openURLsInIframe(a_tags_href);
        

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