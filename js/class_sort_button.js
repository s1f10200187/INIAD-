
/**
 * すべてのスライドをDLボタンを2023年のトップ画面に追加
 * @type {string}
 */
$(function(){
    if(window.location.pathname == "/courses/2023"){
        const clsbtn = '<button id="download-slide-all" class="btn btn-success">すべてのスライドをDL</button>'
        $($(".flex")[0]).before(clsbtn);
    }
});

//ボタンが押下されたとき、iframeに5秒ごとにスライドを表示させる
$(document).on("click", "#download-slide-all", async function(){
    let confirm_regist = confirm("すべてのスライドDLをしますか？");
    if(confirm_regist){
      const links = document.querySelectorAll('.btn.btn-primary');
      for (const link of links) {
        // リンクの絶対URLを取得
        const href = new URL(link.href, url).href;
        // iframeを作成してURLのサイトを表示
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '500px'; // 適切な高さに調整してください
        iframe.src = href;
        document.body.appendChild(iframe); // iframeをbodyに追加

        // 5秒待ってから次のスライドを表示
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    }
});